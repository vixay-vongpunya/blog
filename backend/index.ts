import express from "express"
import dotenv from "dotenv"
import router from "./src/infrastructure/UI/router";

const app = express();
dotenv.config();
app.use(router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Server is runnning at http://localhost:${PORT}`)
})