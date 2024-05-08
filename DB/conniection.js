import mongoose from "mongoose";

const connectDB= async()=>{
    return mongoose.connect(process.env.DB)
    .then(()=>{
       console.log("success to connect DB ");
    }
    ).catch(er=>{
        console.log("err connecting DB",er);
    })
}
export default connectDB;