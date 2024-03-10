import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "./auth.controller.js";

const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

export const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    console.log(refreshToken);
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

    try {
        const foundUser = await User.findOne({ refreshToken }).exec();
        console.log(foundUser);

        // Detected refresh token reuse!
        if (!foundUser) {
            jwt.verify(
                refreshToken,
                REFRESH_SECRET_KEY,
                async (err, decoded) => {
                    if (err) return res.sendStatus(403); // Forbidden
                    console.log('Attempted refresh token reuse!');
                    const hackedUser = await User.findOne({ userEmail: decoded.userEmail }).exec();
                    if (hackedUser) {
                        hackedUser.refreshToken = [];
                        await hackedUser.save();
                    }
                    return res.sendStatus(403); // Forbidden
                }
            );
            return; // Return here to prevent further execution
        }

        const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

        // Evaluate jwt 
        jwt.verify(
            refreshToken,
            REFRESH_SECRET_KEY,
            async (err, decoded) => {
                if (err) {
                    console.log('Expired refresh token');
                    foundUser.refreshToken = [...newRefreshTokenArray];
                    await foundUser.save();
                    return res.sendStatus(403); // Forbidden
                }
                if (foundUser.username !== decoded.username) return res.sendStatus(403);

                // Refresh token was still valid
                const roles = Object.values(foundUser.roles);
                const accessToken = generateAccessToken(foundUser, roles);

                const newRefreshToken = generateRefreshToken(foundUser);
                // Saving refreshToken with current user
                foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
                await foundUser.save();

                // Creates Secure Cookie with refresh token
                res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None' });
                return res.json({ roles, accessToken });
            }
        );
    } catch (error) {
        console.error("Error handling refresh token:", error);
        return res.sendStatus(500); // Internal Server Error
    }
};
