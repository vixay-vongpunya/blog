import { inject, injectable } from "tsyringe";
import { FindSubscriptionRepositoryPort } from "../port/secondary/FindSubscriptionRepositoryPort";
import { UnCaughtError } from "@root/src/Errors/UnCaught";

@injectable()
export class FindSubscriptionUsecase{
    constructor(@inject("FindSubscriptionRepository") private findSubscriptionRepository: FindSubscriptionRepositoryPort){
        this.findSubscriptionRepository = findSubscriptionRepository
    }

    async findUserSubscriptionByUser(userId: string){
        try{
            const subscription = await this.findSubscriptionRepository.findUserSubscriptionByUser(userId)
            return subscription
        }
        catch(error){
            throw new UnCaughtError(error.error)
        }
        
    }

    async findCategorySubscriptionByUser(userId: string){
        try{
            const subscription = await this.findSubscriptionRepository.findCategorySubscriptionByUser(userId)
            return subscription
        }
        catch(error){
            throw new UnCaughtError(error.error)
        }
        
    }
}