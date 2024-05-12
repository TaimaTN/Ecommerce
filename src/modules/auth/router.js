import {Router} from 'express';
import * as Controller from './controller.js';
const route= Router();

route.post('/register',Controller.register);
route.post('/login',Controller.login);

export default route;