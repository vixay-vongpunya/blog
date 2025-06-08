import { inject, injectable } from "tsyringe";
import { PostPort } from "../port/primary/PostPort";
import { PostRepositoryPort } from "../port/secondary/PostRepositoryPort";
import { IPostCreate, IPostUpdate } from "../domain/IPost";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { PostEventPublisherPort } from "../port/secondary/PostEventPublisherPort";

@injectable()
export class PostUsecase implements PostPort{
    constructor(@inject("PostRepository") private postRepository: PostRepositoryPort,
        @inject("PostEventPublisher") private postEventPublisher: PostEventPublisherPort){
    }
    async create(post: IPostCreate){
        try{

            const persist = await this.postRepository.create(post)
            await this.postEventPublisher.created({authorId: persist.authorId, title: persist.title, preview: persist.preview})
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