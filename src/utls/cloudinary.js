import 'dotenv/config.js';
import {v2 as cloudinary} from 'cloudinary';

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.cloud_name, 
        api_key: process.env.api_key, 
        api_secret:process.env.api_secret // Click 'View Credentials' below to copy your API secret
    },)
export default cloudinary