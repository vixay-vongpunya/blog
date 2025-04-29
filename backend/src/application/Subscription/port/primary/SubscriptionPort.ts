import { ICategorySubscriptionCreate, ISubscription, IUserSubscriptionCreate } from "../../domain/ISubscription";

export interface SubscriptionPort{
    createUserSubscription(subsciption: IUserSubscriptionCreate): Promise<any>
    createCategorySubscription(subsciption: ICategorySubscriptionCreate): Promise<any>
}