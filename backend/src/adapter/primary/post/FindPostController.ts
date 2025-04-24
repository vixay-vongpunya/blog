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
        console.log(postData)
        return postData
    }
}