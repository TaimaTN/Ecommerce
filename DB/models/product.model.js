import { Schema, Types, model } from "mongoose";

const productSchema= new Schema({
name:{
    type: String,
    unique: true,
    trim: true/// remove not usefual spacies
},
slug:{
    type: String,
    unique: true
},
mainImage:{
    type:Object,
    required: true,
},
subImages:[{
    type:Object,
    required: true,
}],
colors:[String],
sizes:[{
    type: String,
    enum:['s','m','l','xl']
}],
status: {
    type: String,
    default: 'Active',
    enum: ['Active', 'InActive'],
},
description:{
    type: String,
    unique: true
},
stock:{
    type: Number,
    default:1
},
price:{type :Number, required:true},
finalPrice:Number,
discount:{  type: Number, default:0},

catagoryId:{ type: Types.ObjectId, ref:'Catagory',required:true},
subcatagoryId:{ type: Types.ObjectId, ref:'Subcatagory',required:true},
createdBy: {type: Types.ObjectId, ref: 'User',},
updatedBy: { type: Types.ObjectId, ref: 'User',}

},{
    timestamps:true
});

const productModel= model('Product',productSchema);
export default productModel;