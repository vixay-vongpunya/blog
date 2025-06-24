

export interface FindSubscriptionRepositoryPort{
    findUserToUserSubscriptionId( userId: string, authorId: string): Promise<any>
    findUserFollowers(userId: string, cursor: string | undefined): Promise<any>
    findUserSubscriptionFollower(authorId: string): Promise<{id: string, name: string}[]>
    findUserSubscriptionFollowing(userId: string): Promise<string[]>
    findUserSubscriptionFollowerCount(userId: string): Promise<number>
    findUserFollowersCount(userId: string): Promise<number>
    findCategorySubscriptionByUser(userId: string): Promise<any>
    findCategorySubscription(userId: string, categoryId: string): Promise<any>
    findCategorySubscriptionCount(categoryId: string): Promise<number>
}