import slugify from "slugify";
import catagoryModel from "../../../DB/models/catagory.model.js";
import cloudinary from "../../utls/cloudinary.js";

const getAll = (req, res) => {
    return res.json('Catagories...')
}

const create = async (req, res) => {
    try {
        const name = req.body.name.toLowerCase();

        if (await catagoryModel.findOne({ name }))
            return res.status(409).json({ message: "catagory already exist" });

        const path = `C:/Users/dell/Downloads/${req.file.originalname}`;
        //  return res.json( path);//

        const { secure_url, public_id } = await cloudinary.uploader.upload(path, {
            folder: 'tecomerce/catagory1',
        })
        // .then(async () => {
        //     const catagory = await catagoryModel.create({ name, slug: slugify(name), image: { secure_url, public_id } });
        //     return res.json({ message: "success create a catagory", catagory });
        // }
        // ).catch((error) => {
        //     console.log(error);
        //     return res.status(400).json({ message: "catch error in cloudinary", error });
        // });
        const catagory = await catagoryModel.create({ name, slug: slugify(name), image: { secure_url, public_id } });
        return res.json({ message: "success create a catagory", catagory });

    } catch (er) {
        return res.status(400).json({ Error: "catch error " + er.stack });
    }

};

export { getAll, create };