import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { Request, Response } from "express";
import db from "@root/src/infrastructure/db/db";

const router = Router()

router.get('', authMiddleware, async(_:Request, res: Response)=>{
    res.status(200).json(await db.category.findMany())
})

export default router