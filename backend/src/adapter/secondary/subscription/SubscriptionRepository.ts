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
        try{
            const data = await this.userSubscription.create({
                data:{
                    userId: subscription.userId,
                    authorId: subscription.authorId
                }
            })
            
            return data
        }
        catch(error){
            throw new UnCaughtError(error.error)
        }
    }

    async createCategorySubscription(subscription: ICategorySubscriptionCreate): Promise<any> {
        try{
            const data = await this.categorySubscription.create({
                data:{
                    userId: subscription.userId,
                    categoryId: subscription.categoryId
                }
            })
            
            return data
        }
        catch(error){
            throw new UnCaughtError(error.error)
        }
    }

}