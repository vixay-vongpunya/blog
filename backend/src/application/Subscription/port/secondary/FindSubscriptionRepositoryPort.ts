import { CategoryId } from "@root/src/application/Post/domain/IPost";
import { UserId } from "@root/src/application/User/domain/IUser";


export interface FindSubscriptionRepositoryPort{
    findUserSubscription(userId: string, authorId: string): Promise<any>
    findUserSubscriptionFollowerCount(userId: string): Promise<number>
    findUserSubscriptionFollowingCount(userId: string): Promise<number>
    findCategorySubscriptionByUser(userId: string): Promise<any>
    findCategorySubscription(userId: string, categoryId: string): Promise<any>
    findCategorySubscriptionCount(categoryId: string): Promise<number>
}