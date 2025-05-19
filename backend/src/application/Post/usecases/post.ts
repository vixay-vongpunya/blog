import { inject, injectable } from "tsyringe";
import { PostPort } from "../port/primary/PostPort";
import { PostRepositoryPort } from "../port/secondary/PostRepositoryPort";
import { IPostCreate, IPostUpdate } from "../domain/IPost";
import { UnCaughtError } from "@root/src/Errors/UnCaught";

@injectable()
export class PostUsecase implements PostPort{
    constructor(@inject("PostRepository") private postRepository: PostRepositoryPort){
        this.postRepository = postRepository
    }
    async create(post: IPostCreate){
        try{

            const persist = await this.postRepository.create(post)
            console.log("halo", persist)
            return persist

        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    async update(post: IPostUpdate){
        try{
            const persist = await this.postRepository.update(post);
            return persist

        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

}