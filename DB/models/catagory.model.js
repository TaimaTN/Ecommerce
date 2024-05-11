import {Schema,Types,model} from 'mongoose';

const catagorySchema= new Schema({
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

const catagoryModel = model('Catagory',catagorySchema);
export default catagoryModel;