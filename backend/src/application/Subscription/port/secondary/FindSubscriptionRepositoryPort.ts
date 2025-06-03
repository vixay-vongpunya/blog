

export interface FindSubscriptionRepositoryPort{
    findUserSubscriptionId( userId: string, authorId: string): Promise<any>
    findUserSubscriptionFollowing(userId: string, cursor: string | undefined): Promise<any>
    findUserSubscriptionFollowerCount(userId: string): Promise<number>
    findUserSubscriptionFollowingCount(userId: string): Promise<number>
    findCategorySubscriptionByUser(userId: string): Promise<any>
    findCategorySubscription(userId: string, categoryId: string): Promise<any>
    findCategorySubscriptionCount(categoryId: string): Promise<number>
}