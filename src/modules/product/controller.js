import slugify from "slugify";
import catagoryModel from "../../../DB/models/catagory.model.js";
import subcatagoryModel from "../../../DB/models/subcatagory.model.js";
import productModel from "../../../DB/models/product.model.js";
import cloudinary from "../../utls/cloudinary.js";

const getAll = (req, res) => {
    return res.json('PRoduct...')
}

const create = async (req, res) => {
    const { catagoryId, subcatagoryId, name, price, discount } = req.body;
    const checkCatagory = await catagoryModel.findById(catagoryId);
    if (!checkCatagory) return res.status(400).json({ message: "Catagory not found" });
    const checkSubCatagory = await subcatagoryModel.findOne({ _id: subcatagoryId, catagoryId });
    if (!checkSubCatagory) return res.status(400).json({ message: "Sub catagory not found" });

    req.slug = slugify(name);
    req.finalPrice = price - (price * (discount || 0) / 100);

    let path = req.files.mainImage[0].path;
    if (!path) path = `C:/Users/dell/Downloads/${req.files.mainImage[0].originalname}`;
    const { secure_url, public_id } = await cloudinary.uploader.upload(path, {
        folder: `${process.env.STORE_NAME}/product/${name}`
    });
    req.body.mainImage = { secure_url, public_id };

    req.body.subImages=[];
    for(const f of req.files.subImages){
        let path = f.path;
    if (!path) path = `C:/Users/dell/Downloads/${f.originalname}`;
    const { secure_url, public_id } = await cloudinary.uploader.upload(path, {
        folder: `${process.env.STORE_NAME}/product/${name}/subImages`});
        req.body.subImages.push({ secure_url, public_id });
    }

    const product= await productModel.create(req.body);
    return res.status(200).json({message:'success',product});
}

export { getAll, create };