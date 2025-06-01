

export interface FindSubscriptionPort{
    findUserSubscription(userId: string, authorId: string): Promise<any>
    findUserSubscriptionByUser(userId: string): Promise<any>
    findCategorySubscriptionFollowerCount(userId: string,categoryId: string): Promise<any>
}