import { commentController, findPostController, postController } from "@root/DiContainer";
import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { uploadPostImage } from "@root/src/lib/multerConfig";
import session from "express-session";

const router = Router()
// need to add multer to manage image file
// image cant be saved to db so i need to handle this way

// router.get("/search", authMiddleware, async(req: Request, res: Response)=>{
//     console.log("normal", req.query)
//     res.status(200).json(await findPostController.findByQuery({...req.query, userId: req.user.id}))
// })

// router.get("/search/total-pages", authMiddleware, async(req: Request, res: Response)=>{
//     res.status(200).json(await findPostController.findSearchTotalPages({...req.query}))
// })

router.get("/semantic_search", authMiddleware, async(req: Request, res: Response)=>{
    //using express session
    console.log("session id", req.session.id)
    res.status(200).json(await findPostController.findBySemanticQuery(req.query.query as string, req.user.id))
})

router.get("/recent", authMiddleware, async(req: Request, res: Response) => {
    res.status(200).json(await findPostController.findRecentPosts(req.user.id))
})

router.get("/:postId", authMiddleware, async(req: Request, res: Response)=>{
    const postId = req.params.postId
    // console.log("here",await findPostContainer.findPost(postId))
    res.status(200).json(await findPostController.findPost(postId))
})

router.post("/:postId/comments", authMiddleware, async(req: Request, res: Response)=>{
    console.log(req.body)
    const comment = {
        content: req.body.content,
        postId: req.params.postId,
        userId: req.user.id
    }
    console.log(comment)
    // console.log("here",await findPostContainer.findPost(postId))
    res.status(200).json(await commentController.create(comment))
})


// need to rename
// this route is not ok, since i should fetch by knowing what type of posts needed
router.get("", authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await findPostController.findAllPosts(req.user.id))
})

router.post("", authMiddleware, uploadPostImage.single('image'), async(req: Request, res: Response)=>{
    res.status(201).json(await postController.create({...req.body, image: req.file.filename, authorId: req.user.id}))
})

router.put("", authMiddleware, async(req: Request, res: Response)=>{
    res.status(201).json(await postController.update(req.body))
})

router.get("/:postId/comments", authMiddleware, async(req: Request, res: Response)=>{
    
    // console.log("here",await findPostContainer.findPost(postId))
    res.status(200).json(await commentController.findByPost(req.params.postId))
})

export default router;