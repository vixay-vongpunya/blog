import "reflect-metadata"

import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import router from "./src/infrastructure/UI/router";

const app = express();
dotenv.config();
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));  
app.use(router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Server is runnning at http://localhost:${PORT}`)
})