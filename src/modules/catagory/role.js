import { roles } from "../../middelware/auth.js";
import { update } from "./controller.js";

const endPoints = {

    get: [roles.Admin, roles.User],
    active: [roles.User],
    create: [roles.Admin],
    delete: [roles.Admin],
    update: [roles.Admin]
};

export { endPoints };