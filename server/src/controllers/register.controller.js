import User from "../models/User.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";


export const handleSignUp = async (req, res) => {
    const { email, first_name, last_name, phone_number, pwd } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Validation errors
        return res.status(400).json({ errors: errors.array() });
    }

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) return res.status(409).json({message: "User already exists"}); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const userObj = { email, first_name, last_name, phone_number, phone_number,password:hashedPwd}
        const result = await User.create(userObj);

        console.log(result);

        res.status(201).json({ 'success': `New user ${email} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}
