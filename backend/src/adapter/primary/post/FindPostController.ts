import { FindPostPort } from "@root/src/application/Post/port/primary/FindPostPort";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindPostController{
    constructor(@inject("FindPostUseCase") private findPostUseCase: FindPostPort){
        this.findPostUseCase = findPostUseCase
    }
    async findPostsByUseId(userId: string){
        let postsData = await this.findPostUseCase.findPostsByUserId(userId)
        return postsData
    }
}