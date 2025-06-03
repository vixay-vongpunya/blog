import { inject, injectable } from "tsyringe";
import { FindSubscriptionRepositoryPort } from "../port/secondary/FindSubscriptionRepositoryPort";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { FindSubscriptionPort } from "../port/primary/FindSubscriptionPort";

@injectable()
export class FindSubscriptionUsecase implements FindSubscriptionPort{
    constructor(@inject("FindSubscriptionRepository") private findSubscriptionRepository: FindSubscriptionRepositoryPort){
        this.findSubscriptionRepository = findSubscriptionRepository
    }

    async findUserSubscriptionId( userId: string, authorId: string){
        try{
            const subscription = await this.findSubscriptionRepository.findUserSubscriptionId(userId, authorId)
            return {subscription: {id: subscription?.id ? subscription.id : null}}
        }
        catch(error){
            throw new UnCaughtError(error.error)
        }
    }

    async findUserSubscriptionFollowing( myId: string, userId: string, cursor: string | undefined){
        try{
            console.log("arrived")
            const subscription = await this.findSubscriptionRepository.findUserSubscriptionFollowing(userId, cursor)
            console.log("arrived 2", subscription)
            const authors = await Promise.all(
                subscription.map(async({id, author}:any)=>{
                    //check if subscribing
                    const subscriptionId = await this.findSubscriptionRepository.findUserSubscriptionId(myId, author.id)
                    return {
                        id,
                        subscription:{
                            id: subscriptionId
                        },
                        author: {
                            ...author,
                            profileImage: author.profileImage ? `http://localhost:4000/public/users/profileImages/${author.profileImage}` : null,
                        }
                    }
                }
            ))

            return authors
        }
        catch(error){
            throw new UnCaughtError(error.error)
        }
    }

    // async findUserSubscriptionByUser(userId: string){
    //     try{
    //         const subscription = await this.findSubscriptionRepository.findUserSubscriptionId(userId)
    //         return subscription
    //     }
    //     catch(error){
    //         throw new UnCaughtError(error.error)
    //     }
    // }

    async findCategorySubscriptionFollowerCount(userId: string, categoryId: string){
        try{
            const [subscription, followerCount] = await Promise.all([
                this.findSubscriptionRepository.findCategorySubscription(userId, categoryId),
                this.findSubscriptionRepository.findCategorySubscriptionCount(categoryId)
            ])

            return {
                subscription: {
                    id: subscription?.id ? subscription.id : null
                },
                followerCount: followerCount
            }
        }
        catch(error){
            throw new UnCaughtError(error.error)
        }
        
    }

}