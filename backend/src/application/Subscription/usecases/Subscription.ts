import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { SubscriptionPort } from "../port/primary/SubscriptionPort";
import { ICategorySubscriptionCreate, IUserSubscriptionCreate } from "../domain/ISubscription";
import { inject, injectable } from "tsyringe";
import { SubscriptionRepositoryPort } from "../port/secondary/SubscriptionRepositoryPort";

@injectable()
export class SubscriptionUsecase implements SubscriptionPort{
    constructor(@inject("SubscriptionRepository") private subscriptionRepository: SubscriptionRepositoryPort){
        this.subscriptionRepository = subscriptionRepository
    }
    
    async createUserSubscription(subscription: IUserSubscriptionCreate){
        const data = this.subscriptionRepository.createUserSubscription(
            {userId: subscription.userId, authorId: subscription.authorId}
        )
        return data
    }

    async deleteUserSubscription(subscriptionId: string){
        const data = this.subscriptionRepository.deleteUserSubscription(subscriptionId)
        return data
    }

    async createCategorySubscription(subsciption: ICategorySubscriptionCreate): Promise<any> {
        const data = this.subscriptionRepository.createCategorySubscription(
            {userId: subsciption.userId, categoryId: subsciption.categoryId}
        )
        return data
    }

    async removeCategorySubscription(subscriptionId: string): Promise<any> {
        const data = this.subscriptionRepository.removeCategorySubscription(subscriptionId)
        return data
    }
}