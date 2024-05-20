import { Router } from "express";
import * as Controller from "./controller.js";
import { endPoints } from "./role.js";
import auth from "../../middelware/auth.js";
import fileUpload, { fileType } from "../../utls/multer.js";

const router= Router({caseSensitive:true});
router.get('/',Controller.getAll);
router.post('/create',auth(endPoints.create),fileUpload(fileType.image).fields([
    {name:'mainImage', maxCount:1},
    {name:'subImages', maxCount:5}
]), Controller.create);

export default router;