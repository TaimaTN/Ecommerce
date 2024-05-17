import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from "../../../DB/models/user.model.js";
import { sendEmail } from '../../utls/email.js';
import { customAlphabet } from 'nanoid';

const register = async (req, res) => {
    try {
        const { email, userName, password } = req.body;

        const user = await userModel.findOne({ email });
        if (user) return res.status(409).json({ message: " user email alredy register " });

        const hashPass = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND));

        const Cuser = await userModel.create({ email, userName, password: hashPass });
        await sendEmail(email, `Weclome`, `<h2>hello yA ${userName}</h2>`);
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

const sendCode = async (req, res) => {
    const { email } = req.body;
    const code = customAlphabet('1234567890abcdef', 4)();

    const u = await userModel.findOneAndUpdate({ email }, { sendCode: code });

    if (!u) return res.status(400).json({ Message: 'invalid email' });

    await sendEmail(email, `Reset Password `, `<h2>code ${code}</h2>`);
    return res.status(200).json({ Message: 'sucess sending code', });

};

const forgetPasswOrd = async (req, res)=>{
    const { email, newpassword, code } = req.body;

    const user = await userModel.findOne({ email }).select('sendCode password');
    if (!user) return res.status(400).json({ Message: 'invalid email, not found user' });
    
     if (user.sendCode != code) return res.status(400).json({ Message: 'invalid code' });

     user.password=bcrypt.hashSync(newpassword,parseInt(process.env.SALT_ROUND));
     user.sendCode=null;
     user.save();
     
    return res.status(200).json({ Message: 'sucess update the password', user });
};

export { register, login, sendCode, forgetPasswOrd }