import { FindSubscriptionPort } from "@root/src/application/Subscription/port/primary/FindSubscriptionPort";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { injectable, inject } from "tsyringe";

@injectable()
export class FindSubscriptionController {
    constructor(@inject("FindSubscriptionUsecase") private findSubscriptionUsecase: FindSubscriptionPort){
    }

    async findUserSubscription(userId: string, authorId: string){
        try{
            // this is bad
            const subscription = await this.findSubscriptionUsecase.findUserSubscription(userId, authorId)
            return subscription
        }
        catch(error){
            throw new UnCaughtError(error.error)
        }
    }

    async findCategorySubscriptionFollowerCount(userId: string, categoryId: string){
        try{

            const subscription = await this.findSubscriptionUsecase.findCategorySubscriptionFollowerCount(userId, categoryId)
            return subscription
        }
        catch(error){
            throw new UnCaughtError(error.error)
        }
    }

    // async findBooleanUserSubscription(author: UserId, userId: UserId){
    //     try{
    //         const userSubscription = await this.findSubscriptionUsecase.findUserSubscriptionByUser(userId)

    //         return subscription
    //     }
    //     catch(error){
    //         throw new UnCaughtError(error.error)
    //     }
    // }
}