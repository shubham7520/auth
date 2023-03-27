import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({
                error: true,
                message: "User already exit"
            })
        }
        let user = await User.findOne({ "email": req.body.email })
        if (user) {
            return res.status(409).json({
                error: true,
                message: "User already exit"
            })
        }
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        user = await User.create(req.body);
        return res.status(201).json({ message: `User Created`, user });

    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error" })
    }
}
const login = async (req, res) => {
    try {
        const user = await User.findOne({ "email": req.body.email })
        if (!user) {
            return res.status(400).json({ error: true, message: "User not exit" })
        }
        let isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: true, message: "Wrong email or password" })
        }
        var token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: '1000s' })
        console.log(token);
        res.status(200).json({ user: { _id: user._id, name: user.name, email: user.email, token: token } });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: true, message: "Internal Server Error" })
    }
}

const profile = async (req, res) => {
    const data = await User.findById(req.user._id);
    res.send(data);

}

export {
    register, login, profile
}