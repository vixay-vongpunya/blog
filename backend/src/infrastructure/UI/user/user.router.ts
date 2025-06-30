import { authUserController,  findPostController,  findSearchHistoryController,  findSubscriptionController,  findUserController,  findVectorStoreController,  savedPostController,  searchHistoryController,  subscriptionController, userController } from "@root/DiContainer";
import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { uploadUserImages } from "@root/src/lib/multerConfig";
import { UnAuthorizedError } from "@root/src/Errors/UnAuthorized";
import { ValidationError } from "@root/src/Errors/Validation";
import { NotFoundError } from "@root/src/Errors/NotFound";

const router = Router()

router.get('/self', authMiddleware, async(req:Request, res: Response): Promise<any> => {
    return res.status(200).json(await findUserController.findById(req.user.id))  
})

// router.get("/self/posts", authMiddleware, async(req: Request, res: Response)=>{
//     res.status(200).json(await findPostController.findPostsByAuthor(req.user.id))
// })
router.get('/search_history', authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await findSearchHistoryController.findByUser(req.user.id))
})

router.get('/:name', async(req:Request, res: Response): Promise<any> => {
    return res.status(200).json(await findUserController.findByName(req.params.name))  
})

router.get("/:userId/posts", authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await findPostController.findPostsByAuthor(req.params.userId, req.query.cursor as string))
})

// might not need
// router.get('/self/subscriptions', authMiddleware, async(req: Request, res: Response)=>{
//     res.status(200).json(await findSubscriptionController.findSubscriptionByUser(req.user.id))
// })

router.get('/:authorId/users/subscriptions/following', authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await findSubscriptionController.findUserFollowers(req.user.id, req.params.authorId, req.query.cursor as string))
})

//authorId placement not correct should be after users
router.get('/users/subscriptions/:authorId', authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await findSubscriptionController.findUserToUserSubscriptionId(req.user.id, req.params.authorId))
})

router.get("/posts/feed", authMiddleware, async(req: Request, res: Response)=>{
    const data = {
        page: req.query.page as string,
        take: req.query.take as string,
        userId: req.user.id ? req.user.id : undefined,
        sessionId: req.sessionID
    }
    res.status(200).json(await findPostController.findFeedPosts(data))
})

router.get("/posts/following", authMiddleware, async(req: Request, res: Response)=>{
   
    res.status(200).json(await findPostController.findFollowingPosts(req.user.id, req.sessionID, req.query.cursor as string))
})




// post
router.post('/log-in', async(req:Request, res: Response): Promise<any> => {
    try{
        const {email, password} = req.body
        const response = await authUserController.login(email, password)
            res.cookie('accessToken', response.token, {
            httpOnly: true,
            //secure: true,//require https
            sameSite: 'strict',
            maxAge: 24*60*60*1000,
            path: '/'
        }).json({success:true, message: "user logged in successfully"})
    }
    catch(error){
        if(error instanceof UnAuthorizedError || error instanceof NotFoundError || error instanceof ValidationError){
            res.status(error.status).json(error.message)
        }
        else{
            res.status(500).json("Internal server error")
        }
    }
})

router.post('/log-out', async(req:Request, res: Response): Promise<any> => {
    try{
        res.clearCookie('accessToken').json({success:true, message: "user logged out successfully"})
    }
    catch(error){
        // if(error instanceof UnAuthorizedError || error instanceof NotFoundError || error instanceof ValidationError){
        //     res.status(error.status).json(error.message)
        // }
        // else{
        //     res.status(500).json("Internal server error")
        // }
    }
})


router.post('/sign-up', async(req:Request, res: Response): Promise<any> => {
    // const {email, password} = req.body
    // await userController.create(req.body)
    // const {token} = await userController.create(email, password)
    // res.cookie('accessToken', token, {
    //     httpOnly: true,
    //     //secure: true,//require https
    //     sameSite: 'strict',
    //     maxAge: 24*60*60*1000,
    // }).json({success:true, message: "user logged in successfully"})    
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
router.put('', authMiddleware, uploadUserImages.fields([
    {'name': 'profileImage', maxCount: 1},
    {'name': 'backgroundImage', maxCount: 1}]),
    async(req: Request, res: Response):Promise<any> => {
        const files = req.files as {[fieldname: string]: Express.Multer.File[]}
        
        const profileImage =  files['profileImage']?.[0].filename
        const backgroundImage =  files['backgroundImage']?.[0].filename
        return res.status(200).json(await userController.update({
            ...req.body, 
            id: req.user.id, 
            profileImage: profileImage, 
            backgroundImage: backgroundImage
        }))
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

router.delete('/search_history/:id', authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await searchHistoryController.delete(req.params.id as string))
})

export default router;