import slugify from "slugify";
import catagoryModel from "../../../DB/models/catagory.model.js";
import cloudinary from "../../utls/cloudinary.js";

const getAll = async (req, res) => {// for admin
    try {
        const catagories = await catagoryModel.find({}).populate([{
            path: "createdBy", select:"userName"
        },{
            path:"updatedBy", select:"userName"
        },{
            path: "subcatagories"
        }]);
        return res.status(200).json({ catagorries: catagories });
    } catch (er) {
        return res.status(400).json({ Error: "catch error " + er.stack });
    }
}

const getActive = async (req, res) => {
    try {
        const rslt = await catagoryModel.find({ status: "Active" }).select("image");
        return res.status(200).json({ catagorries_IN_Active: rslt });
    } catch (er) {
        return res.status(400).json({ Error: "catch error " + er.stack });
    }
};

const getDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const rslt = await catagoryModel.findOne({ _id: id }).select("name");
        return res.status(200).json({ ccatagory_details: rslt });
    } catch (er) {
        return res.status(400).json({ Error: "catch error " + er.stack });
    }
}

const create = async (req, res) => {
    try {
        const name = req.body.name.toLowerCase();

        if (await catagoryModel.findOne({ name }))
            return res.status(409).json({ message: "catagory already exist" });
        const path = `C:/Users/dell/Downloads/${req.file.originalname}`;
        if (req.file.path) path = req.file.path;
        //  return res.json( path);//

        const { secure_url, public_id } = await cloudinary.uploader.upload(path, {
            folder: `${process.env.STORE_NAME}/catagory1`,
        })
        // .then(async () => {
        //     const catagory = await catagoryModel.create({ name, slug: slugify(name), image: { secure_url, public_id } });
        //     return res.json({ message: "success create a catagory", catagory });
        // }
        // ).catch((error) => {
        //     console.log(error);
        //     return res.status(400).json({ message: "catch error in cloudinary", error });
        // });
        const catagory = await catagoryModel.create({ name, slug: slugify(name), image: { secure_url, public_id }, createdBy:req.userId, updatedBy:req.userId});
        return res.status(200).json({ message: "success create a catagory", catagory });

    } catch (er) {
        return res.status(400).json({ Error: "catch error " + er.stack });
    }

};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const catagory = await catagoryModel.findOne({ _id: id });
        if (!catagory) return res.status(404).json({ Message: "Not found a ctagory in this id, plz try with correct one" });
        catagory.name = req.body.name.toLowerCase();
        if (await catagoryModel.findOne({ name: catagory.name, _id: { $ne: id } })) {
            return res.status(409).json({ mssage: "name already exaists, PLZ try with differn" })
        }
        catagory.slug = slugify(catagory.name);
        if (req.file) {
            const path = `C:/Users/dell/Downloads/${req.file.originalname}`;
            if (req.file.path) path = req.file.path;
            const { secure_url, public_id } = await cloudinary.uploader.upload(path, {
                folder: 'tecomerce/catagory1',
            });
            await cloudinary.uploader.destroy(catagory.image.public_id);// delet the past image from cloudinary
            catagory.image = { secure_url, public_id };
        }

        catagory.status = req.body.status;
        catagory.updatedBy=req.userId;
        catagory.save();
        return res.status(200).json({ message: "success catagory update", catagory });

    } catch (er) {
        return res.status(400).json({ Error: "catch error " + er.stack });
    }
}

const destroy = async (req, res) => {
    try {
        const cat = await catagoryModel.findOneAndDelete({ _id: req.params.id });
        if (!cat) return res.status(404).json({ message: " catagory  not found, or deleted befor" });

        await cloudinary.uploader.destroy(cat.image.public_id)
        return res.status(200).json({ message: "sucess delete catagory", cat });

    } catch (er) {
        return res.status(400).json({ Error: "invalid id " + er.stack });
    }
}

export { getAll, create, getActive, getDetails, update, destroy };