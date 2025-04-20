import "reflect-metadata"

import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import router from "./src/infrastructure/UI/router";
import cookieParser from "cookie-parser"

const app = express();
dotenv.config();
app.use(express.json())
app.use(cookieParser())
//simple form not nested object setting
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));  
app.use(router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Server is runnning at http://localhost:${PORT}`)
})