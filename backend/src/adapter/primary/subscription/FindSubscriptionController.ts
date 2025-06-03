import { FindSubscriptionPort } from "@root/src/application/Subscription/port/primary/FindSubscriptionPort";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { injectable, inject } from "tsyringe";

@injectable()
export class FindSubscriptionController {
    constructor(@inject("FindSubscriptionUsecase") private findSubscriptionUsecase: FindSubscriptionPort){
    }

    async findUserSubscriptionId(userId: string, authorId: string){
        try{
            // this is bad
            const subscription = await this.findSubscriptionUsecase.findUserSubscriptionId(userId, authorId)
            return subscription
        }
        catch(error){
            throw new UnCaughtError(error.error)
        }
    }

    // myId: logged in user Id
    // userId: requested user id of this profile(friend)
    async findUserSubscriptionFollowing(myId: string, userId: string, cursor: string){
        try{
            const sanitizedCursor = cursor === "undefined" ? undefined : cursor
            const subscription = await this.findSubscriptionUsecase.findUserSubscriptionFollowing(myId, userId, sanitizedCursor)
            return subscription
        }
        catch(error){
            throw new UnCaughtError(error.error)
        }
    }

    // async findUserSubscriptionCount(userId: string){
    //     try{
    //         const subscription = await this.findSubscriptionUsecase.findUserSubscriptionCount(userId)
    //         return subscription
    //     }
    //     catch(error){
    //         throw new UnCaughtError(error.error)
    //     }
    // }

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