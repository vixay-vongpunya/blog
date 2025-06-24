import { inject, injectable } from "tsyringe";
import { VectorStoreServicePort } from "../../VectorStoreService/port/secondary/VectorStoreServicePort";
import { UserViewedPostRepositoryPort } from "../../UserViewedPost/port/secondary/UserViewedPostRepositoryPort";

@injectable()
export class UserEventUsecase {
    constructor(@inject("VectorStoreService") private vectorStoreService: VectorStoreServicePort,
        @inject("UserViewedPostRepository") private userViewedPostRepository: UserViewedPostRepositoryPort){

    }
    async userVectorUpdate(userId: string){
        const Ids = await this.userViewedPostRepository.find(userId)
        let postIds = Ids.map(data=> data.postId)
        const data = {
            userId: userId,
            postIds: postIds
        }
        await this.vectorStoreService.updateUserVector(data)
    }
}