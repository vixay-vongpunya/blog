import { authUserController, findPostContainer, findUserController, userController } from "@root/DiContainer";
import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth";
const router = Router()

router.get('/self', authMiddleware, async(req:Request, res: Response): Promise<any> => {
    return res.status(200).json(req.user)  
})

router.post('/log-in', async(req:Request, res: Response): Promise<any> => {
    console.log(req.body)
    const {email, password} = req.body
    const {token} = await authUserController.login(email, password)
    res.cookie('accessToken', token, {
        httpOnly: true,
        //secure: true,//require https
        sameSite: 'strict',
        maxAge: 24*60*60*1000,
        path: '/'
    }).json({success:true, message: "user logged in successfully"})
})

router.post('/sign-up', async(req:Request, res: Response): Promise<any> => {
    console.log(req.body)
    try{
        const {email, password} = req.body
        await userController.create(req.body)
        const {token} = await authUserController.login(email, password)
    res.cookie('accessToken', token, {
        httpOnly: true,
        //secure: true,//require https
        sameSite: 'strict',
        maxAge: 24*60*60*1000,
    }).json({success:true, message: "user logged in successfully"})

    }
    catch(error){
        return res.json(error.e)
    }  
})

router.post('/log-out', async(req:Request, res: Response): Promise<any> => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        //secure: true,//require https
        sameSite: 'strict',
    }).json({success:true, message: "user logged out successfully"})
})

router.get("/posts", authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await findPostContainer.findPostsByUserId(req.user.id))
})

router.post('/update', authMiddleware, async(req: Request, res: Response):Promise<any> => {
    return res.status(200).json(await userController.update(req.body))
})

router.delete('/delete', authMiddleware, async(req: Request, res: Response):Promise<any> => {
    let id = "1"
    return res.status(200).json(await userController.delete(id))
})



router.get('',authMiddleware, async(req: Request, res: Response):Promise<any> =>{
   
    return res.status(201).json(req.user);
})

export default router;