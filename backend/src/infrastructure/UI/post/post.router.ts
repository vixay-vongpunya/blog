import { postController } from "@root/DiContainer";
import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";

const router = Router()

router.post("/create", authMiddleware, async(req: Request, res: Response)=>{
    console.log("ok")
    res.status(201).json(await postController.create({...req.body, authorId: req.user.id}))
})

export default router;