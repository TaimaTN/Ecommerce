import { Router } from "express";
import * as Controller from "./controller.js";
import { endPoints } from "./role.js";
import auth from "../../middelware/auth.js";
import subcatagoryRouter from './../subcatagory/router.js';
import fileUpload, { fileType } from "../../utls/multer.js";

const router = Router({ caseSensitive: true });
router.use('/:id/subcatagory', subcatagoryRouter)
router.get('/', auth(endPoints.get), Controller.getAll);
router.get('/active', auth(endPoints.active), Controller.getActive);
router.get('/:id', auth(endPoints.get), Controller.getDetails);
router.post('/create', auth(endPoints.create), fileUpload(fileType.image).single('image'), Controller.create);
router.put('/:id', auth(endPoints.update), fileUpload(fileType.image).single('image'), Controller.update);
router.delete('/:id', auth(endPoints.delete), Controller.destroy);


export default router;