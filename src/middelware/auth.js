import jwt from 'jsonwebtoken';
import userModel from '../../DB/models/user.model.js';

const roles ={
    Admin:'Admin',
    User: 'User'
}

const auth = (accessRole=[]) => {
    return async (req, res, next) => {
        try {
            const { authoraization } = req.headers;

            if (!authoraization?.startsWith(process.env.BEARER_TOKEN))
                return res.status(400).json({ message: 'invalid token or bearer token' });

            const token = authoraization.split(process.env.BEARER_TOKEN)[1];
            const decode = jwt.verify(token, process.env.LOGIN_SEG);
            if (!decode) return res.status(400).json({ message: 'invalid tokenn' });
            //verify  user in DB
            const user = await userModel.findOne({ _id: decode.id }).select("userName role");
            if (!user)
                return res.status(400).json({ message: 'user not found, deleted' });

            if(!accessRole.includes(user.role)) return res.status(403).json({mesage:'not authoraise user'});
          
            req.userId = user._id;
            next();

        } catch (er) {
            return res.status(400).json({ message: "invalid data", error: er.stack });
        }
    }
}
export default auth;
export {roles};