import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true /// note if i set default: null , i cant has more the one null because its unique value 
    },
    confirmEmail: { type: Boolean, default: false },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        default: 'Male'
    },
    image: {
        type: Object
    },
    status:{
        type:String,
        enum:['Active','InActive'],
        default:'Active'
    },
    role:{
        type: String ,
        enum:['User','Admin']
    },
    phone: String,
    address: String
}, {
    timestamps: true
});

const userModel = model('User', userSchema);
export default userModel;