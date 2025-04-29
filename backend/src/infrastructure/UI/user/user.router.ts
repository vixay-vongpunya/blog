import { authUserController,  findPostController,  findSubscriptionController,  subscriptionController, userController } from "@root/DiContainer";
import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth";
const router = Router()

router.get('/self', authMiddleware, async(req:Request, res: Response): Promise<any> => {
    return res.status(200).json(req.user)  
})

router.get("/self/posts", authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await findPostController.findPostsByUserId(req.user.id))
})

router.get("/:userId/posts", authMiddleware, async(req: Request, res: Response)=>{
    const authorId = req.params.userId
    res.status(200).json(await findPostController.findPostsByUserId(authorId))
})

router.get('/self/subscriptions', authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await findSubscriptionController.findSubscriptionByUserController(req.user.id))
})

// post
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

router.post('/users/subscriptions', authMiddleware, async(req: Request, res: Response)=>{
    const data = {
        userId: req.user.id,
        authorId: req.body.authorId
    }

    res.status(200).json(await subscriptionController.createUserSubscription(data))
})

router.post('/categories/subscriptions',authMiddleware, async(req: Request, res: Response)=>{
    const data = {
        userId: req.user.id,
        categoryId: req.body.categoryId
    }

    res.status(200).json(await subscriptionController.createCategorySubscription(data))
})

//put
router.put('', authMiddleware, async(req: Request, res: Response):Promise<any> => {
    return res.status(200).json(await userController.update(req.body))
})


// delete
router.delete('', authMiddleware, async(req: Request, res: Response):Promise<any> => {
    let id = "1"
    return res.status(200).json(await userController.delete(id))
})

export default router;