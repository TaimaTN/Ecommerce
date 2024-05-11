import multer from "multer";

const fileType = {
    image: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'],// mime type/extention of image
    pdf: ['application/pdf']
};


const fileUpload = (customTypes = []) => {
    const storage = multer.diskStorage({});

    const filter = (req, file, cb) => {
        if (customTypes.includes(file.mimetype))
            cb(null, true)
        else {
            cb("invalid format ..file extention", false);
        }
    }

    const upload = multer({ fileFilter: filter }, storage);
    return upload;
};
export default fileUpload;
export {fileType};