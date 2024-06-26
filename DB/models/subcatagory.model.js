import {Schema,Types,model} from 'mongoose';

const subcatagorySchema= new Schema({
    name:{
        type:String,
        unique: true
    },
    image:{
        type: Object,
        required: true,
    },
    slug:{
        type: String,
        required : true
    },
    status:{
        type:String,
        default:'Active',
        enum:['Active','InActive'],
    },
    catagoryId:{
        type:Types.ObjectId,
        ref:'Catagory',
        required:true
    },
    createdBy: { 
        type:Types.ObjectId,
        ref:'User',
        // required: true
    },
    updatedBy: { 
        type:Types.ObjectId,
        ref:'User',
        // required: true
    }
},{
    timestamps:true
});

const subcatagoryModel = model('Subcatagory',subcatagorySchema);
export default subcatagoryModel;