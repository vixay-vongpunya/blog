import { CategoryId } from "@root/src/application/Post/domain/IPost";
import { UserId } from "@root/src/application/User/domain/IUser";


export interface FindSubscriptionRepositoryPort{
    findUserSubscription(userId: string, authorId: string): Promise<any>;
    findUserSubscriptionByUser(userId: UserId): Promise<any>;
    findCategorySubscriptionByUser(userId: UserId): Promise<any>;
    findCategorySubscription(userId: UserId, categoryId: CategoryId): Promise<string>;
}