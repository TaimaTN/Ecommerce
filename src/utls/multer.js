import multer from 'multer';

const fileType = {
    image: ['image/png', 'image/jpeg','image/JPG','image/jpg', 'image/webp', 'image/svg+xml'],// mime type/extention of image
    pdf: ['application/pdf']
};


const fileUpload = (customTypes = []) => {
  try { 
    const storage = multer.diskStorage({ });//diskStorage .>  memoryStorage

    const filter = (req, file, cb) => {
        if (customTypes.includes(file.mimetype))
            cb(null, true)
        else {
            cb("invalid format ..file extention", false);
        }
    }

    const upload = multer({ fileFilter: filter }, storage);
    return upload;
}catch(er){
    return res.json({Error: "muter CATCH ERR ", er});
}
}
export default fileUpload;
export {fileType};