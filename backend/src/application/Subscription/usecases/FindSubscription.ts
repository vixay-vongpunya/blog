import { inject, injectable } from "tsyringe";
import { FindSubscriptionRepositoryPort } from "../port/secondary/FindSubscriptionRepositoryPort";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { FindSubscriptionPort } from "../port/primary/FindSubscriptionPort";

@injectable()
export class FindSubscriptionUsecase implements FindSubscriptionPort{
    constructor(@inject("FindSubscriptionRepository") private findSubscriptionRepository: FindSubscriptionRepositoryPort){
        this.findSubscriptionRepository = findSubscriptionRepository
    }

    async findUserToUserSubscriptionId( userId: string, authorId: string){
        const subscription = await this.findSubscriptionRepository.findUserToUserSubscriptionId(userId, authorId)
        return {subscription: {id: subscription?.id ? subscription.id : null}}
    }

    async findUserFollowers( myId: string, userId: string, cursor: string | undefined){
        console.log("arrived")
        const subscription = await this.findSubscriptionRepository.findUserFollowers(userId, cursor)
        console.log("arrived 2", subscription)
        const authors = await Promise.all(
            subscription.map(async({id, author}:any)=>{
                //check if subscribing
                const subscriptionId = await this.findSubscriptionRepository.findUserToUserSubscriptionId(myId, author.id)
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
    // async findUserSubscriptionByUser(userId: string){
    //         //         const subscription = await this.findSubscriptionRepository.findUserToUserSubscriptionId(userId)
    //         return subscription
    //     }
    //         // }

    async findCategorySubscriptionFollowerCount(userId: string, categoryId: string){
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
}