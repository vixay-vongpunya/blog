import { IPostSearch } from "@root/src/application/Post/domain/IPost";
import { FindPostPort } from "@root/src/application/Post/port/primary/FindPostPort";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindPostController{
    constructor(@inject("FindPostUsecase") private findPostUseCase: FindPostPort){
        this.findPostUseCase = findPostUseCase
    }

    async findPostsByUserId(userId: string){
        let posts = await this.findPostUseCase.findPostsByUserId(userId)
        return posts
    }

    async findPost(postId: string){
        let post = await this.findPostUseCase.findPost(postId)
        return post
    }

    async findRecentPosts(userId: string){
        let posts = await this.findPostUseCase.findRecentPosts(userId)
        return posts
    }

    async findByKeyword(keyword: IPostSearch){
        let post = await this.findPostUseCase.findByKeyword(keyword)
        return post
    }

    async findAllPosts(userId: string){
        let post = await this.findPostUseCase.findAllPosts(userId)
        return post
    }

    async findByCategory(userId: string, categoryId: string){
        let {posts, isSubscribed} = await this.findPostUseCase.findByCategory(userId, categoryId)
        return {posts, isSubscribed}
    }

    
}