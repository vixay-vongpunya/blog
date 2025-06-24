import { VectorStorePort } from "@root/src/application/VectorStoreService/port/primary/VectorStorePort";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindVectorStoreController {
    constructor(@inject("VectorStoreUsecase") private vectorStoreUsecase: VectorStorePort){}
    async findRelatedPost(userId: string, postId: string){
        let posts = await this.vectorStoreUsecase.findRelatedPosts(userId, postId)
        return posts
    }
}