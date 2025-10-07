import { commentController, findPostController, findVectorStoreController, postController } from "@root/DiContainer";
import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { uploadPostImage } from "@root/src/lib/multerConfig";

const router = Router()
// need to add multer to manage image file
// image cant be saved to db so i need to handle this way

// router.get("/search", authMiddleware, async(req: Request, res: Response)=>{
//     console.log("normal", req.query)
//     res.status(200).json(await findPostController.findByQuery({...req.query, userId: req.user.id}))
// })

router.get("/search/total_pages", authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await findPostController.findSearchTotalPages({...req.query, sessionId: req.sessionID, userId: req.user.id}))
})

router.get("/semantic_search", authMiddleware, async(req: Request, res: Response)=>{
    //using express session
    const data = {
        query: req.query.query as string,
        page: req.query.page as string,
        take: req.query.take as string,
        userId: req.user.id ? req.user.id : undefined,
        sessionId: req.sessionID
    }
    res.status(200).json(await findPostController.findBySemanticQuery(data))
})

router.get("/popular", authMiddleware, async(req: Request, res: Response) => {
    res.status(200).json(await findPostController.findPopularPosts(req.user.id, req.query.cursor as string))
})

router.get("/:postId", authMiddleware, async(req: Request, res: Response)=>{
    const postId = req.params.postId
    // console.log("here",await findPostContainer.findPost(postId))
    res.status(200).json(await findPostController.findPost(req.user.id, postId))
})

router.post("/:postId/comments", authMiddleware, async(req: Request, res: Response)=>{
    const comment = {
        content: req.body.content,
        postId: req.params.postId,
        userId: req.user.id,
        parentId: req.body.parentId,
        replyToUserId: req.body.replyToUserId,
    }
    // console.log("here",await findPostContainer.findPost(postId))
    res.status(200).json(await commentController.create(comment))
})


// need to rename
// this route is not ok, since i should fetch by knowing what type of posts needed


router.post("", authMiddleware, uploadPostImage.single('image'), async(req: Request, res: Response)=>{
    res.status(201).json(await postController.create({...req.body, image: req.file.filename, authorId: req.user.id}))
})

router.put("", authMiddleware, async(req: Request, res: Response)=>{
    res.status(201).json(await postController.update(req.body))
})

router.get("/:postId/comments/total_count", authMiddleware, async(req: Request, res: Response)=>{
    
    // console.log("here",await findPostContainer.findPost(postId))
    res.status(200).json(await commentController.findByPostTotalCount(req.params.postId))
})

router.get("/:postId/comments", authMiddleware, async(req: Request, res: Response)=>{
    
    // console.log("here",await findPostContainer.findPost(postId))
    res.status(200).json(await commentController.findByPost(req.params.postId, req.query.cursor as string, req.query.take as string))
})

router.get("/:postId/related", authMiddleware, async(req: Request, res: Response)=>{
    
    res.status(200).json(await findVectorStoreController.findRelatedPost(req.user.id, req.params.postId))
})

export default router;