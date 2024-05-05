import User from "../models/User.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import ROLES_LIST from "../config/roles_list.js";

const ADMINS = ["roneli386@gmail.com"]

export const handleSignUp = async (req, res) => {
    const { email, first_name, last_name, phone_number, pwd } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Validation errors
        console.log(errors)
        return res.status(400).json({ errors: errors.array() });
    }

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) return res.status(409).json({message: "User already exists"}); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const roles = ADMINS.find((admin) => admin.toLocaleLowerCase() === email.toLocaleLowerCase()) ? {User:ROLES_LIST.User, Admin:ROLES_LIST.Admin} : null;
        const userObj = { email, first_name, last_name, phone_number,roles ,password:hashedPwd}
        const result = await User.create(userObj);

        console.log(result);

        res.status(201).json({ 'success': `New user ${email} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}
