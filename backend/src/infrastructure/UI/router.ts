
import {Router} from "express";
import userRouter from "./user/user.router";



const router = Router();
router.use('/api/user', userRouter);

export default router