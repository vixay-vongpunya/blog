

export interface FindSubscriptionPort{
    findUserSubscriptionByUser(userId: string): Promise<any>
    findCategorySubscriptionByUser(userId: string): Promise<any>
}