import { inject, injectable } from "tsyringe";
import { PostPort } from "../port/primary/PostPort";
import { PostRepositoryPort } from "../port/secondary/PostRepositoryPort";
import { IPostCreate } from "../domain/IPost";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { Post } from "../domain/Post";


@injectable()
export class PostUseCase implements PostPort{
    constructor(@inject("PostRepository") private postRepository: PostRepositoryPort){
        this.postRepository = postRepository
    }
    async create(post: IPostCreate){
        try{

            let postData = new Post(post.title, post.content, post.authorId, post.image)

            const persist = await this.postRepository.create(postData)
            return persist

        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

}