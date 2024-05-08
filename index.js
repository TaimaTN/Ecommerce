import express from "express";
import"dotenv/config.js";
import initApp from "./src/app.router.js";
const PORT= process.env.PORT;
const app =express();
initApp(app,express);
app.listen(PORT,()=>{
    console.log(`server running at port ${PORT} ...` );
})
