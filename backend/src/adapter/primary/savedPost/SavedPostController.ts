import { SavedPostPort } from "@root/src/application/SavedPost/port/primary/SavedPostPort";
import { inject, injectable } from "tsyringe";


@injectable()
export class SavedPostController {
    constructor(@inject('SavedPostUsecase') private savedPostUsecase: SavedPostPort){

    }

    async create(userId: string, postId: string){
        const savedPost = await this.savedPostUsecase.create(userId, postId)
        return savedPost
    }

    async delete(userId: string, id: string){
        const savedPost = await this.savedPostUsecase.delete(userId, id)

        return savedPost
    }
}