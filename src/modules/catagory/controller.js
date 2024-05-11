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

        //    return res.json({ message:  req.file});

        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder: 'tecomerce/catagory1',
        })
            .then(async () => {
                const catagory = await catagoryModel.create({ name, slug: slugify(name), image: { secure_url, public_id } });
                return res.json({ message: "success create a catagory", catagory });
            }
            ).catch((error) => {
                console.log(error);
                return res.json({ message: "catch error in cloudinary", error });
            });

    } catch (er) {
        return res.json({ Error: "catch error" + er.stack });
    }
}

export { getAll, create };