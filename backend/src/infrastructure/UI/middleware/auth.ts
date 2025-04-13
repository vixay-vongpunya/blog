import {Request, Response} from "express"
import { IUser, IUserToUI } from "@root/src/application/User/domain/IUser";
import { authUserController } from "@root/DiContainer";


declare module 'express-serve-static-core'{
    interface Request{
        user?: IUser
    }
}

export const authMiddleware = async (req: Request, res: Response, next:any)=>{
    try{
        const token = req.headers.authorization?.split('Bearer ')[1]
        if(!token){
            res.status(401).json({error: "Credentials are not provided"})
        }

        req.user = await authUserController.authenticate(token)
        console.log(req.user)
        next()
    }
    catch(error:any){
        res.status(401).json({error:error.message})
        
    }
}