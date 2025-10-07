import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { findSubscriptionController, subscriptionController } from "@root/DiContainer";

const router = Router()
//users
router.post('/users', authMiddleware, async(req: Request, res: Response)=>{
    const data = {
        userId: req.user.id,
        authorId: req.body.authorId
    }
    res.status(200).json(await subscriptionController.createUserSubscription(data))
})

//authorId placement not correct should be after users
router.get('/users/:authorId', authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await findSubscriptionController.findUserToUserSubscriptionId(req.user.id, req.params.authorId))
})

router.get('/users/:authorId/following', authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await findSubscriptionController.findUserFollowing(req.user.id, req.params.authorId, req.query.cursor as string))
})


router.delete('/:subscriptionId/users', authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await subscriptionController.deleteUserSubscription(req.params.subscriptionId))
})


//category
router.post('/categories',authMiddleware, async(req: Request, res: Response)=>{
    const data = {
        userId: req.user.id,
        categoryId: req.body.categoryId
    }

    res.status(200).json(await subscriptionController.createCategorySubscription(data))
})

router.delete('/:subcriptionId/categories',authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await subscriptionController.removeCategorySubscription(req.params.subscriptionId))
})

export default router