import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { Request, Response } from "express";
import { findPostController, findSubscriptionController, findUserController } from "@root/DiContainer";
import { PrismaClient } from ".prisma/client";

const router = Router()
const prisma = new PrismaClient()

router.get("/:categoryId/subscriptions/detail", authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await findSubscriptionController.findCategorySubscriptionFollowerCount(req.user.id, req.params.categoryId))
})

router.get("/:categoryId/posts/search", authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await findPostController.findByCategory(req.user.id, req.params.categoryId, req.query.cursor as string))
})

router.get("/:categoryId/users/search", authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await findUserController.findByCategory(req.user.id, req.params.categoryId, req.query.cursor as string))
})

router.get("", authMiddleware, async(req: Request, res: Response)=>{
    const data = await prisma.category.findMany()
    res.status(200).json(data)
})

export default router