import { ICategorySubscriptionCreate, IUserSubscriptionCreate } from "../../domain/ISubscription";

export interface SubscriptionRepositoryPort{
    createUserSubscription(subscription: IUserSubscriptionCreate): Promise<any>
    deleteUserSubscription(subscriptionId: string): Promise<any>
    createCategorySubscription(subscription: ICategorySubscriptionCreate): Promise<any>
    removeCategorySubscription(subscriptionId: string): Promise<any>

}