import { PrismaClient } from ".prisma/client";
import { authUserController, findPostContainer, userController } from "@root/DiContainer";
import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth";
const router = Router()

const prisma = new PrismaClient();

router.post('/login', async(req:Request, res: Response): Promise<any> => {
    console.log(req.body)
    const {email, password} = req.body
    return res.status(200).json(await authUserController.login(email, password))
})

router.post('/create', async(req: Request, res: Response):Promise<any> => {

    return res.status(201).json(await userController.create(req.body));
})

router.post('/update', authMiddleware, async(req: Request, res: Response):Promise<any> => {
    return res.status(200).json(await userController.update(req.body))
})

router.delete('/delete', authMiddleware, async(req: Request, res: Response):Promise<any> => {
    let id = "1"
    return res.status(200).json(await userController.delete(id))
})

router.get("/posts", authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await findPostContainer.findPostsByUseId(req.user.id))
})

router.get('', async(req: Request, res: Response):Promise<any> =>{
    const email = req.query.email as string;
    const user = await prisma.user.findUnique({where:{email: email}})
    console.log(user)
    return res.status(201).json(user);
})

export default router;