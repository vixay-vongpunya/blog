import "reflect-metadata"

import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import router from "./src/infrastructure/UI/router";
import cookieParser from "cookie-parser"
import session from "express-session";
import eventClient from "./src/infrastructure/events/RabbitMQService";
import cacheClient from "./src/infrastructure/cache/redis";
import { postConsumer } from "./DiContainer";
import { userConsumer } from "./DiContainer";

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

app.use(session({
    secret: "blog-app",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 12*60*60*1000,
        secure: false
    }
}))

app.use(router);
app.use('/public', express.static('public'))

async function boostrap(){
    try{
        await eventClient.initialize()
        await cacheClient.initialize()
        await postConsumer.consume()
        await userConsumer.consume()
    }
    catch(error){
        console.log(error)
    }
}

boostrap()

    

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Server is runnning at http://localhost:${PORT}`)
})

