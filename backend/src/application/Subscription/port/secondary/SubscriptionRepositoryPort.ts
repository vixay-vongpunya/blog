import { ICategorySubscriptionCreate, IUserSubscriptionCreate } from "../../domain/ISubscription";

export interface SubscriptionRepositoryPort{
    createUserSubscription(subscription: IUserSubscriptionCreate): Promise<any>
    createCategorySubscription(subscription: ICategorySubscriptionCreate): Promise<any>
}