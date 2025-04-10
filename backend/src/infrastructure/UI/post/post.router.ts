import { Router, Request, Response } from "express";

const router = Router()

router.post("/", async(req: Request, res: Response)=>{
    res.status(201).json({message: "reached"})
})

export default router;