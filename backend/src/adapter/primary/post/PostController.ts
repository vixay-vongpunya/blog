import { IPostCreate, IPostToUI } from "@root/src/application/Post/domain/IPost";
import { PostPort } from "@root/src/application/Post/port/primary/PostPort";
import { inject, injectable } from "tsyringe";
import { UserMapper } from "../../mappers/UserMapper";
import { PostMapper } from "../../mappers/PostMapper";

@injectable()
export class PostController {
    private postMapper: typeof PostMapper
    constructor(@inject("PostUseCase") private post: PostPort){
        this.post = post
        this.postMapper = PostMapper
    }
    async create(body: IPostCreate): Promise<IPostToUI>{
        try{

            const postDTO = this.postMapper.toDomain(body)
            const postData = await this.post.create(postDTO)
            return postData

        }
        catch(error){
            throw error
        }
    }
}