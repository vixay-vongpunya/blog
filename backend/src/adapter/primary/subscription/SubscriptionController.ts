import { ICategorySubscriptionCreate, IUserSubscriptionCreate } from "@root/src/application/Subscription/domain/ISubscription";
import { SubscriptionPort } from "@root/src/application/Subscription/port/primary/SubscriptionPort";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { inject, injectable } from "tsyringe";

@injectable()
export class SubscriptionController{
    constructor(@inject("SubscriptionUsecase") private subscriptionUsecase: SubscriptionPort){
        this.subscriptionUsecase = subscriptionUsecase
    }
    
    async createUserSubscription(subscription: IUserSubscriptionCreate){
        try{
            const data = this.subscriptionUsecase.createUserSubscription(
                {userId: subscription.userId, authorId: subscription.authorId}
            )
            
            return data
        }
        catch(error){
            throw new UnCaughtError(error.error)
        }
    }

    async createCategorySubscription(subscription: ICategorySubscriptionCreate){
        try{
            const data = this.subscriptionUsecase.createCategorySubscription(
                {userId: subscription.userId, categoryId: subscription.categoryId}
            )
            
            return data
        }
        catch(error){
            throw new UnCaughtError(error.error)
        }
    }
}