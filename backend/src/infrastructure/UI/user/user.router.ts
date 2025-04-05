import {Request, Response, Router} from "express";
const router = Router()

router.get('/hi', async(req: Request, res: Response):Promise<any> =>{
    return res.status(201).json("hey");
})

export default router;