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

    async findUserToUserSubscriptionId(userId: string, authorId: string): Promise<any>{
        console.log(userId, authorId)
        const data = await this.userSubscription.findFirst({
            where:{
                userId: userId,
                authorId: authorId,
            }
        })
        return data
    }

    async findUserFollowing(userId: string, cursor: string | undefined): Promise<any>{
                    
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
                        displayName: true, 
                        bio: true,
                        profileImage: true,
                    }
                }
            }

        })
        console.log("data", data)
        return data
    }
    
    async findUserSubscriptionFollower(authorId: string): Promise<any>{
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

    async findUserSubscriptionFollowing(userId: string): Promise<any>{
        const data = await this.userSubscription.findMany({
            where:{
                userId: userId,
            },
            select: {
                authorId: true
            }
        })

        return data
    }
    
    //find followers
    async findUserSubscriptionFollowerCount(userId: UserId): Promise<any> {
        const data = await this.userSubscription.count({
            where:{
                authorId: userId
            }
        })
        return data
    }
     
    async findUserFollowersCount(userId: UserId): Promise<any> {
        const data = await this.userSubscription.count({
            where:{
                userId: userId
            }
        })
        return data
    }

    // my following categories
    async findCategorySubscriptionByUser(userId: UserId): Promise<any> {
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

    //check if exists
    async findCategorySubscription(userId: UserId, categoryId: CategoryId): Promise<any> {
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

    async findCategorySubscriptionCount(categoryId: string): Promise<any> {
        const data = await this.categorySubscription.count({
            where:{
                categoryId: categoryId
            },
        })
        return data
    }
}