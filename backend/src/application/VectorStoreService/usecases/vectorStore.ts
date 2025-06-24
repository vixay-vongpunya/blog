import { inject, injectable } from "tsyringe";
import { VectorStoreServicePort } from "../port/secondary/VectorStoreServicePort";
import { FindPostRepositoryPort } from "../../Post/port/secondary/FindPostRepositoryPort";
import { postsProcessing } from "../../helpers/posts_processing";

@injectable()
export class VectorStoreUsecase {
    private postsProcessing : typeof postsProcessing
    constructor(@inject("VectorStoreService") private vectorStoreService: VectorStoreServicePort,
            @inject("FindPostRepository") private findPostRepository: FindPostRepositoryPort){
                this.postsProcessing = postsProcessing
    }

    async find(query: string){
        const data = await this.vectorStoreService.find(query)
        console.log(data)
        return data
    }

    async findRelatedPosts(userId: string, postId: string){
        const Ids = await this.vectorStoreService.find(postId)
        let postsData = await Promise.all(
            Ids.map((postId: string) =>
                this.findPostRepository.findPostPreview(postId, userId)
            )
        )
        
        let postList = this.postsProcessing(postsData) 

        return postList
    }
}