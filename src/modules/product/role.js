import { roles } from "../../middelware/auth.js";

const endPoints = {
    create: [roles.Admin],
};

export { endPoints };