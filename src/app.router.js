import cors from "cors";
import fileupload from 'express-fileupload'; 
import connectDB from '../DB/conniection.js';
import catagoryRouter from './modules/catagory/router.js';
import productRouter from './modules/product/router.js';

const initApp = (app, express) => {
    app.use(express.json());
    connectDB();
    app.use(cors());
    // app.use(fileupload({useTempFiles: true}));
    app.get('/', (req, res) => {
        return res.json('Welcome in ecommerCE..')
    });
    app.use('/catagories', catagoryRouter);
    app.use('/products', productRouter);

    app.use('/*', (req, res) => {
        return res.status(404).json({ message: "page not found" });
    })
}

export default initApp;