import { Router } from "express";
import * as Controller from "./controller.js";
const router= Router({caseSensitive:true});
router.get('/',Controller.getAll)

export default router;