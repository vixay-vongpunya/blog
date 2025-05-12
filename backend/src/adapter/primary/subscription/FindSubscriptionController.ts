import { FindSubscriptionPort } from "@root/src/application/Subscription/port/primary/FindSubscriptionPort";
import { UserId } from "@root/src/application/User/domain/IUser";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { injectable, inject } from "tsyringe";

@injectable()
export class FindSubscriptionController {
    constructor(@inject("findSubscriptionUsecase") private findSubscriptionUsecase: FindSubscriptionPort){
    }

    async findSubscriptionByUserController(userId: string){
        try{
            // this is bad
            const userSubscription = await this.findSubscriptionUsecase.findUserSubscriptionByUser(userId)
            const categorySubscription = await this.findSubscriptionUsecase.findCategorySubscriptionByUser(userId)
            const subscription = {
                "userSubscription": userSubscription,
                "categorySubscription": categorySubscription
            }

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