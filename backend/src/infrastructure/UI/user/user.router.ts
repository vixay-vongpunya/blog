import { PrismaClient } from ".prisma/client";
import { userController } from "@root/DiContainer";
import {Request, Response, Router} from "express";
import { authMiddleware } from "../middleware/auth";
const router = Router()

const prisma = new PrismaClient();

router.post('/create', async(req: Request, res: Response):Promise<any> => {

    return res.status(201).json(await userController.create(req.body));
})

router.post('/update', authMiddleware, async(req: Request, res: Response):Promise<any> => {
    return res.status(200).json(await userController.update(req.body))
})

router.delete('/delete', authMiddleware, async(req: Request, res: Response):Promise<any> => {
    const id = req.params.id
    return res.status(200).json(await userController.delete(id))
})

router.get('', async(req: Request, res: Response):Promise<any> =>{
    const email = req.query.email as string;
    const user = await prisma.user.findUnique({where:{email: email}})
    console.log(user)
    return res.status(201).json(user);
})

export default router;