import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;
const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY;


// Function to generate a JWT
export const generateAccessToken = (user, roles) => {
    const payload = { "UserInfo": {
        "userEmail": user.email,
        "roles": roles
    } };
    const options = { expiresIn: "15m" };
    return jwt.sign(payload, ACCESS_SECRET_KEY, options);
};

export const generateRefreshToken = (user) => {
    const payload = { userEmail: user.email};
    const options = { expiresIn: "1d" };
    return jwt.sign(payload, REFRESH_SECRET_KEY, options);
};

export const handleSignIn = async (req, res) => {
    const cookies = req.cookies;
    console.log(`cookie available at login: ${JSON.stringify(cookies)}`);
    const { email, pwd } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Validation errors
        return res.status(400).json({ errors: errors.array() });
    }

    const foundUser = await User.findOne({ email: email }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const isMatch = await bcrypt.compare(pwd, foundUser.password);
    if (isMatch) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = generateAccessToken(foundUser, roles);
        const newRefreshToken = generateRefreshToken(foundUser);

        let newRefreshTokenArray =
            !cookies?.jwt
                ? foundUser.refreshToken
                : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

        if (cookies?.jwt) {

            /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
            const refreshToken = cookies.jwt;
            const foundToken = await User.findOne({ refreshToken }).exec();

            // Detected refresh token reuse!
            if (!foundToken) {
                console.log('attempted refresh token reuse at login!')
                // clear out ALL previous refresh tokens
                newRefreshTokenArray = [];
            }

            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        }

        // Saving refreshToken with current user
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        const result = await foundUser.save();
        console.log(result);
        console.log(roles);

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ roles, accessToken });

    } else {
        res.sendStatus(401);
    }
}
