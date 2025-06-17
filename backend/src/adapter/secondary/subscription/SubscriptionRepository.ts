import { PrismaClient } from "@prisma/client/default";
import { ICategorySubscriptionCreate, IUserSubscriptionCreate } from "@root/src/application/Subscription/domain/ISubscription";
import { SubscriptionRepositoryPort } from "@root/src/application/Subscription/port/secondary/SubscriptionRepositoryPort";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import db from "@root/src/infrastructure/db/db";


export class SubscriptionRepository implements SubscriptionRepositoryPort{
    private db: PrismaClient
    private userSubscription: typeof db.userSubscription
    private categorySubscription: typeof db.categorySubscription
    constructor(){
        this.db = db
        this.userSubscription = this.db.userSubscription
        this.categorySubscription = this.db.categorySubscription
    }

    async createUserSubscription(subscription: IUserSubscriptionCreate){
        const data = await this.userSubscription.create({
            data:{
                userId: subscription.userId,
                authorId: subscription.authorId
            }
        })
        
        return data
    }

    async deleteUserSubscription(subscriptionId: string){
        console.log(subscriptionId)
        const exist = await this.userSubscription.findFirst({
            where:{
                id: subscriptionId
            }
        })

        if(!exist){
            throw new UnCaughtError('subscription not found')
        }

        await this.userSubscription.delete({
            where: {
                id: subscriptionId
            }
        })
        
        return 'subscription deleted'
    }

    async createCategorySubscription(subscription: ICategorySubscriptionCreate): Promise<any> {
        const data = await this.categorySubscription.create({
            data:{
                userId: subscription.userId,
                categoryId: subscription.categoryId
            }
        })
        
        return data
    }

    async removeCategorySubscription(subscriptionId: string): Promise<any> {
        console.log(subscriptionId)

        const exist = await this.categorySubscription.findFirst({
            where:{
                id: subscriptionId
            }})
        console.log('exist here', exist)
        if(!exist) {
            throw new UnCaughtError('you are not allowed', 401)
        }
        

        await this.categorySubscription.delete({
            where: {
                id: subscriptionId
            }
        })
        
        return 'deleted'
    }
}