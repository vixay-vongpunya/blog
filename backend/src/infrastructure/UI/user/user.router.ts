import { PrismaClient } from ".prisma/client";
import { userCreateController } from "@root/DiContainer";
import {Request, Response, Router} from "express";
const router = Router()

const prisma = new PrismaClient();

router.post('/create', async(req: Request, res: Response):Promise<any> =>{

    return res.status(201).json(await userCreateController.create(req.body));
})

router.get('', async(req: Request, res: Response):Promise<any> =>{
    const email = req.query.email as string;
    const user = await prisma.user.findUnique({where:{email: email}})
    console.log(user)
    return res.status(201).json(user);
})

export default router;