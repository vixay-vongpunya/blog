import { ICategorySubscriptionCreate, IUserSubscriptionCreate } from "@root/src/application/Subscription/domain/ISubscription";
import { SubscriptionPort } from "@root/src/application/Subscription/port/primary/SubscriptionPort";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { inject, injectable } from "tsyringe";

@injectable()
export class SubscriptionController{
    constructor(@inject("SubscriptionUsecase") private subscriptionUsecase: SubscriptionPort){
    }
    
    async createUserSubscription(subscription: IUserSubscriptionCreate){
        const data = this.subscriptionUsecase.createUserSubscription(
            {userId: subscription.userId, authorId: subscription.authorId})
        return data
    }

    async deleteUserSubscription(subscriptionId: string){
            const data = this.subscriptionUsecase.deleteUserSubscription(subscriptionId)
            return data
        }

    async createCategorySubscription(subscription: ICategorySubscriptionCreate){
        const data = this.subscriptionUsecase.createCategorySubscription(
            {userId: subscription.userId, categoryId: subscription.categoryId})
        return data
    }

    async removeCategorySubscription(subscriptionId: string){
        const data = this.subscriptionUsecase.removeCategorySubscription(subscriptionId)
        return data
    }
}