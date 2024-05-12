import { Router } from "express";
import * as Controller from "./controller.js";
import fileUpload, { fileType } from "../../utls/multer.js";
import auth from "../../middelware/auth.js";

const router= Router({caseSensitive:true});
router.get('/', Controller.getAll);
router.get('/active',Controller.getActive);
router.get('/:id', Controller.getDetails);
router.post('/create', auth(), fileUpload(fileType.image).single('image'), Controller.create);
router.put('/:id', auth(), fileUpload(fileType.image).single('image'), Controller.update);
router.delete('/:id', auth(), Controller.destroy);


export default router;