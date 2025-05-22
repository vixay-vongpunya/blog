import { PrismaClient } from "@prisma/client/default";
import { CategoryId } from "@root/src/application/Post/domain/IPost";
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
    //check if exists
    async findCategorySubscription(userId: UserId, categoryId: CategoryId): Promise<string> {
        try{
            const exist = await this.categorySubscription.findFirst({
                where: {
                    AND: {
                        userId: userId, 
                        categoryId: categoryId
                    }
                }
            })
            console.log("exist by", exist)
            return exist ? exist.id : null
        }
        catch(error){
            throw new UnCaughtError(error.error)
        }
    }
}