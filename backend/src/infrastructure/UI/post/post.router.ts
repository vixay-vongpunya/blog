import { findPostContainer, postController } from "@root/DiContainer";
import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import multer from 'multer'

const router = Router()
// need to add multer to manage image file
// image cant be saved to db so i need to handle this way
const upload = multer({dest:'uploads/'})

router.get("/user", authMiddleware, async(req: Request, res: Response)=>{
    console.log("here",await findPostContainer.findPostsByUseId(req.user.id))
    res.status(200).json(await findPostContainer.findPostsByUseId(req.user.id))
})

router.post("/create", authMiddleware, upload.single('image'), async(req: Request, res: Response)=>{
    res.status(201).json(await postController.create({...req.body, authorId: req.user.id}))
})

router.post("/update", authMiddleware, async(req: Request, res: Response)=>{
    res.status(201).json(await postController.update(req.body))
})

export default router;