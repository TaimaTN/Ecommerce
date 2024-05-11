import { Router } from "express";
import * as Controller from "./controller.js";
import fileUpload, { fileType } from "../../utls/multer.js";

const router= Router({caseSensitive:true});
router.get('/',Controller.getAll);
router.post('/create', fileUpload(fileType.image).single('image'), Controller.create);

export default router;