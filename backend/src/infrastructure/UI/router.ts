
import {Router} from "express";
import userRouter from "./user/user.router";
import postRouter from "./post/post.router";



const router = Router();

router.use('/api/user', userRouter);
router.use('/api/post', postRouter);

export default router