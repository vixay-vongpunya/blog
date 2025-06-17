import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { SavedPostPort } from "../port/primary/SavedPostPort";
import { inject, injectable } from "tsyringe";
import { SavedPostRepositoryPort } from "../port/secondary/SavedPostRepositoryPort";

@injectable()
export class SavedPostUsecase implements SavedPostPort{
    constructor(@inject('SavedPostRepository') private savedPostRepository: SavedPostRepositoryPort){

    }

    async create(userId: string, postId: string){
        const savedPost = this.savedPostRepository.create(userId, postId)
        return savedPost
    }

    async delete(userId: string, id: string){
        const savedPost = this.savedPostRepository.delete(userId, id)
        return savedPost
    }
}