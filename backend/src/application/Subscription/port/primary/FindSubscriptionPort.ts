

export interface FindSubscriptionPort{
    findUserToUserSubscriptionId(userId: string, authorId: string): Promise<any>
    findUserFollowers(myId: string, userId: string, cursor: string | undefined): Promise<any>
    // findUserSubscriptionCount(userId: string): Promise<{follower: number, followering: number}>
    // findUserSubscriptionByUser(userId: string): Promise<any>
    findCategorySubscriptionFollowerCount(userId: string,categoryId: string): Promise<any>
}