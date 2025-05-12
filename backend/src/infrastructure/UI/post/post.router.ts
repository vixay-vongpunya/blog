import { commentController, findPostController, postController } from "@root/DiContainer";
import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { upload } from "@root/src/lib/multerConfig";

const router = Router()
// need to add multer to manage image file
// image cant be saved to db so i need to handle this way

router.get("/search", authMiddleware, async(req: Request, res: Response)=>{
    const {keyword, cursor, order} = req.query
    const data= {
        keyword: keyword as string,
        cursor: cursor as string,
        order: order as 'asc' | 'desc'
    } 
    res.status(200).json(await findPostController.findByKeyword(data))
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
    res.status(200).json(await findPostController.findAllPosts())
})

router.post("", authMiddleware, upload.single('image'), async(req: Request, res: Response)=>{
    console.log("create", req.file)
    res.status(201).json(await postController.create({...req.body, authorId: req.user.id}))
})

router.put("", authMiddleware, async(req: Request, res: Response)=>{
    res.status(201).json(await postController.update(req.body))
})

router.get("/:postId/comments", authMiddleware, async(req: Request, res: Response)=>{
    
    // console.log("here",await findPostContainer.findPost(postId))
    res.status(200).json(await commentController.findByPost(req.params.postId))
})

export default router;