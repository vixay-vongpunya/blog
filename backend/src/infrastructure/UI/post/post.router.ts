import { commentController, findPostController, postController } from "@root/DiContainer";
import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import multer from 'multer'

const router = Router()
// need to add multer to manage image file
// image cant be saved to db so i need to handle this way
const upload = multer({dest:'uploads/'})

router.get("/:postId", authMiddleware, async(req: Request, res: Response)=>{
    const postId = req.params.postId
    // console.log("here",await findPostContainer.findPost(postId))
    res.status(200).json(await findPostController.findPost(postId))
})

router.post("/:postId/comment", authMiddleware, async(req: Request, res: Response)=>{
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

router.get("/category/:categoryId", authMiddleware, async(req: Request, res: Response)=>{
    const categoryId = req.params.categoryId
    res.status(200).json(await findPostController.findPostsByCategory(categoryId))
})

router.get("", authMiddleware, async(req: Request, res: Response)=>{
    const authorId = req.params.authorId
    res.status(200).json(await findPostController.findPostsByUserId(authorId))
})
// need to rename
router.get("/posts/get-all", authMiddleware, async(req: Request, res: Response)=>{
    res.status(200).json(await findPostController.findAllPosts())
})

router.post("/create", authMiddleware, upload.single('image'), async(req: Request, res: Response)=>{
    res.status(201).json(await postController.create({...req.body, authorId: req.user.id}))
})

router.post("/update", authMiddleware, async(req: Request, res: Response)=>{
    res.status(201).json(await postController.update(req.body))
})

export default router;