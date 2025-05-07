import { IPostSearch } from "@root/src/application/Post/domain/IPost";
import { FindPostPort } from "@root/src/application/Post/port/primary/FindPostPort";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindPostController{
    constructor(@inject("FindPostUseCase") private findPostUseCase: FindPostPort){
        this.findPostUseCase = findPostUseCase
    }

    async findPostsByUserId(userId: string){
        let postsData = await this.findPostUseCase.findPostsByUserId(userId)
        return postsData
    }

    async findPost(postId: string){
        let postData = await this.findPostUseCase.findPost(postId)
        return postData
    }

    async findByKeyword(data: IPostSearch){
        let postData = await this.findPostUseCase.findByKeyword(data)
        return postData
    }

    async findAllPosts(){
        let postData = await this.findPostUseCase.findAllPosts()
        return postData
    }

    async findByCategory(categoryId: string, userId: string){
        let {posts, isSubscribed} = await this.findPostUseCase.findByCategory(categoryId, userId)
        return {posts, isSubscribed}
    }
}