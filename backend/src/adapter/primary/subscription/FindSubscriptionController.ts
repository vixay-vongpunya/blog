import { FindSubscriptionPort } from "@root/src/application/Subscription/port/primary/FindSubscriptionPort";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { injectable, inject } from "tsyringe";

@injectable()
export class FindSubscriptionController {
    constructor(@inject("findSubscriptionUsecase") private findSubscriptionUsecase: FindSubscriptionPort){
        this.findSubscriptionUsecase = findSubscriptionUsecase
    }

    async findSubscriptionByUserController(userId: string){
        try{
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
}