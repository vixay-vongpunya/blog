import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { Request, Response } from "express";
import { findPostController } from "@root/DiContainer";
import { PrismaClient } from ".prisma/client";

const router = Router()
const prisma = new PrismaClient()
router.get("/:categoryId/posts", authMiddleware, async(req: Request, res: Response)=>{
    const categoryId = req.params.categoryId
    res.status(200).json(await findPostController.findPostsByCategory(categoryId))
})

router.get("", authMiddleware, async(req: Request, res: Response)=>{
    const data = await prisma.category.findMany()
    res.status(200).json(data)
})

export default router