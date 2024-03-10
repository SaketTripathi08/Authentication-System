import User from "../models/User.js"

export const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

export const deleteUser = async (req, res) => {
    if (!req?.body?.email) return res.status(400).json({ "message": 'User email required' });
    let userEmail = req.body?.email;
    const user = await User.findOne({ email: userEmail }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${userEmail} not found` });
    }
    const result = await user.deleteOne({ email: userEmail });
    res.json(result);
}

export const getUser = async (req, res) => {
    if (!req?.body?.email) return res.status(400).json({ "message": 'User email required' });
    let userEmail = req.body?.email;
    const user = await User.findOne({ email: userEmail }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${userEmail} not found` });
    }
    res.json(user);
}