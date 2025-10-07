import { FindSubscriptionPort } from "@root/src/application/Subscription/port/primary/FindSubscriptionPort";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { injectable, inject } from "tsyringe";

@injectable()
export class FindSubscriptionController {
    constructor(@inject("FindSubscriptionUsecase") private findSubscriptionUsecase: FindSubscriptionPort){
    }

    async findUserToUserSubscriptionId(userId: string, authorId: string){
        // this is bad
        const subscription = await this.findSubscriptionUsecase.findUserToUserSubscriptionId(userId, authorId)
        return subscription
    }

    // myId: logged in user Id
    // userId: requested user id of this profile(friend)
    async findUserFollowing(myId: string, userId: string, cursor: string){
        const sanitizedCursor = cursor === "undefined" ? undefined : cursor
        const subscription = await this.findSubscriptionUsecase.findUserFollowing(myId, userId, sanitizedCursor)
        return subscription
    }
    // async findUserSubscriptionCount(userId: string){
    //         //         const subscription = await this.findSubscriptionUsecase.findUserSubscriptionCount(userId)
    //         return subscription
    //     }
    //         // }

    async findCategorySubscriptionFollowerCount(userId: string, categoryId: string){
        const subscription = await this.findSubscriptionUsecase.findCategorySubscriptionFollowerCount(userId, categoryId)
        return subscription
    }
    // async findBooleanUserSubscription(author: UserId, userId: UserId){
    //         //         const userSubscription = await this.findSubscriptionUsecase.findUserSubscriptionByUser(userId)

    //         return subscription
    //     }
    //         // }
}