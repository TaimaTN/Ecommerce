import bcrypt from 'bcryptjs';
import userModel from "../../../DB/models/user.model.js";
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try {
        const { email, userName, password } = req.body;

        const user = await userModel.findOne({ email });
        if (user) return res.status(409).json({ message: " user email alredy register " });

        const hashPass = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND));

        const Cuser = await userModel.create({ email, userName, password: hashPass });
        return res.status(201).json({ message: "sucess user registeration", Cuser });
    } catch (er) {
        return res.status(400).json({ message: "bad request", error: er.stack });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) return res.status(400).json({ messAge: "invalid eMail" });

        if (user.status == 'InActive') return res.status(400).json({ messAge: "your account is blocked" });

        if (! await bcrypt.compare(password, user.password))// not Match passs
            return res.status(400).json({ message: "invalid password" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.LOGIN_SEG);
        return res.status(200).json({ message: "ucess login", token })
    } catch (er) {
        return res.status(400).json({ message: "bad request", error: er.stack });
    }

}

export { register, login }