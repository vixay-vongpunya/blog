import { findPostContainer, postController } from "@root/DiContainer";
import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";

const router = Router()

router.post("/create", authMiddleware, async(req: Request, res: Response)=>{
    res.status(201).json(await postController.create({...req.body, authorId: req.user.id}))
})

router.post("/update", authMiddleware, async(req: Request, res: Response)=>{
    res.status(201).json(await postController.update(req.body))
})

export default router;