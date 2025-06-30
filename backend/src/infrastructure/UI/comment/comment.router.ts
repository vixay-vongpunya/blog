
import { commentController } from "@root/DiContainer";
import { authMiddleware } from "../middleware/auth"
import { Router, Request, Response } from "express";

const router = Router()

router.get("/:commentId/replies", authMiddleware, async(req: Request, res: Response)=>{
    
    // console.log("here",await findPostContainer.findPost(postId))
    res.status(200).json(await commentController.findReply(req.params.commentId, req.query.cursor as string))
})

export default router;