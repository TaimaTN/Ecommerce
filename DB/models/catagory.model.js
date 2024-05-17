import { Schema, Types, model } from 'mongoose';

const catagorySchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    image: {
        type: Object,
        required: true,
    },
    slug: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Active',
        enum: ['Active', 'InActive'],
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',
        // required: true
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: 'User',
        // required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

//build variual field in catagory collection
catagorySchema.virtual("subcatagories",
    {
        localField: '_id',
        foreignField: 'catagoryId',
        ref: 'Subcatagory'
    }
);

const catagoryModel = model('Catagory', catagorySchema);
export default catagoryModel;