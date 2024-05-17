import {Router} from 'express';
import * as Controller from './controller.js';
const route= Router();

route.post('/register',Controller.register);
route.post('/login',Controller.login);
route.patch('/sendCode',Controller.sendCode);
route.patch('/forgetPasswOrd',Controller.forgetPasswOrd);

export default route;