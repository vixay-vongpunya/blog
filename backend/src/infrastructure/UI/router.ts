
import {Router} from "express";
import userRouter from "./user/user.router";
import postRouter from "./post/post.router";
import commentRouter from "./comment/comment.router";
import categoryRouter from "./category/category.router";

const router = Router();

router.use('/api/users', userRouter);
router.use('/api/posts', postRouter);
router.use('/api/comments', commentRouter);
router.use('/api/categories', categoryRouter);

export default router