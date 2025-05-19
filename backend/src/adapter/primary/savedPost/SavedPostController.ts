import { SavedPostPort } from "@root/src/application/SavedPost/port/primary/SavedPostPort";
import { inject, injectable } from "tsyringe";


@injectable()
export class SavedPostController {
    constructor(@inject('SavedPostUsecase') private savedPostUsecase: SavedPostPort){

    }

    async create(userId: string, postId: string){
        try{
            const savedPost = this.savedPostUsecase.create(userId, postId)
            return savedPost
        }
        catch(error){
            throw error
        }
    }

    async delete(userId: string, id: string){
        try{
            const savedPost = this.savedPostUsecase.delete(userId, id)
            return savedPost
        }
        catch(error){
            throw error
        }
    }
}