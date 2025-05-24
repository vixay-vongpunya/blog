import { authUserController,  findPostController,  findSubscriptionController,  findUserController,  savedPostController,  subscriptionController, userController } from "@root/DiContainer";
import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth";
const router = Router()

router.get('/self', authMiddleware, async(req:Request, res: Response): Promise<any> => {
    return res.status(200).json(req.user)  
})

router.get("/self/posts", authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await findPostController.findPostsByUserId(req.user.id))
})

router.get('/:userId', authMiddleware, async(req:Request, res: Response): Promise<any> => {
    return res.status(200).json(await findUserController.findById(req.params.userId))  
})

router.get("/:userId/posts", authMiddleware, async(req: Request, res: Response)=>{
    const authorId = req.params.userId
    res.status(200).json(await findPostController.findPostsByUserId(authorId))
})

// might not need
router.get('/self/subscriptions', authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await findSubscriptionController.findSubscriptionByUser(req.user.id))
})

router.get('/users/subscriptions/:authorId', authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await findSubscriptionController.findUserSubscription(req.user.id, req.params.authorId))
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
    res.clearCookie('accessToken').json({success:true, message: "user logged out successfully"})
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

router.post('/saved-posts',authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await savedPostController.create(req.user.id, req.body.postId))
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

router.delete('/categories/subscriptions/:categoryId',authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await subscriptionController.removeCategorySubscription(req.params.categoryId))
})

router.delete('/users/subscriptions/:subscriptionId', authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await subscriptionController.deleteUserSubscription(req.params.subscriptionId))
})

router.delete('/saved-posts/:id', authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await savedPostController.delete(req.user.id, req.params.id))
})

export default router;