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

    async findUserSubscriptionId(userId: string, authorId: string): Promise<any>{
        try{
             console.log(userId, authorId)
            const data = await this.userSubscription.findFirst({
                where:{
                    userId: userId,
                    authorId: authorId,
                }
            })
            return data
        }
        catch(error){
            throw new UnCaughtError(error.error)
        }
    }

    async findUserSubscriptionFollowing(userId: string, cursor: string | undefined): Promise<any>{
        try{
            
            const data = await this.userSubscription.findMany({
                cursor: cursor && {id: cursor},
                take: 12,
                where:{
                    userId: userId,
                },
                select: {
                    id: true,
                    author:{
                        select: {
                            id: true,
                            name: true,
                            bio: true,
                            profileImage: true,
                        }
                    }
                }

            })
            console.log("data", data)
            return data
        }
        catch(error){
            throw new UnCaughtError(error.error)
        }
    }

    async findUserSubscriptionFollower(authorId: string): Promise<any>{
        try{
            const data = await this.userSubscription.findMany({
                where:{
                    authorId: authorId,
                },
                select: {
                    id: true,
                    user:{
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                }
            })

            return data
        }
        catch(error){
            throw new UnCaughtError(error.error)
        }
    }

    //find followers
    async findUserSubscriptionFollowerCount(userId: UserId): Promise<any> {
        try{
            const data = await this.userSubscription.count({
                where:{
                    authorId: userId
                }
            })
            return data
        }
        catch(error){
            throw new UnCaughtError(error.error)
        }
    }

    async findUserSubscriptionFollowingCount(userId: UserId): Promise<any> {
        try{
            const data = await this.userSubscription.count({
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

    // my following categories
    async findCategorySubscriptionByUser(userId: UserId): Promise<any> {
        try{
            const data = await this.categorySubscription.findMany({
                where:{
                    userId: userId
                },
                select: {
                    category: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            })
            return data
        }
        catch(error){
            throw new UnCaughtError(error.error)
        }
    }

    //check if exists
    async findCategorySubscription(userId: UserId, categoryId: CategoryId): Promise<any> {
        try{
            const subscription = await this.categorySubscription.findFirst({
                where: {
                    AND: {
                        userId: userId, 
                        categoryId: categoryId
                    }
                }
            })

            return subscription
        }
        catch(error){
            throw new UnCaughtError(error.error)
        }
    }

    async findCategorySubscriptionCount(categoryId: string): Promise<any> {
        try{
            const data = await this.categorySubscription.count({
                where:{
                    categoryId: categoryId
                },
            })
            return data
        }
        catch(error){
            throw new UnCaughtError(error.error)
        }
    }

}