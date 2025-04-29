import { PrismaClient } from "@prisma/client/default";
import { FindSubscriptionRepositoryPort } from "@root/src/application/Subscription/port/secondary/FindSubscriptionRepositoryPort";
import { UserId } from "@root/src/application/User/domain/IUser";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import db from "@root/src/infrastructure/db/db";


export class FindSubscriptionRepository implements FindSubscriptionRepositoryPort{
    private db : PrismaClient
    private userSubscription: typeof db.userSubscription
    private categorySubscription: typeof db.categorySubscription
    constructor(){
        this.db = db
        this.userSubscription = this.db.userSubscription
        this.categorySubscription = this.db.categorySubscription
    }


    async findUserSubscriptionByUser(userId: UserId): Promise<any> {
        try{
            const data = await this.userSubscription.findMany({
                where:{
                    userId: userId
                }
            })
            return data
        }
        catch(error){
            throw new UnCaughtError(error.error)
        }
    }

    async findCategorySubscriptionByUser(userId: UserId): Promise<any> {
        try{
            const data = await this.categorySubscription.findMany({
                where:{
                    userId: userId
                }
            })
            return data
        }
        catch(error){
            throw new UnCaughtError(error.error)
        }
    }
}