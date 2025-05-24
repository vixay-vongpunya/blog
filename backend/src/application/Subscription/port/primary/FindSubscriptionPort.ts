

export interface FindSubscriptionPort{
    findUserSubscription(userId: string, authorId: string): Promise<any>
    findUserSubscriptionByUser(userId: string): Promise<any>
    findCategorySubscriptionByUser(userId: string): Promise<any>
}