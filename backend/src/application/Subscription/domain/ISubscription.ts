import { CategoryId } from "../../Post/domain/IPost"
import { UserId } from "../../User/domain/IUser"

export type SubscriptionId = string


export type ISubscription = {
    id: SubscriptionId,
    userId: UserId,
    createdAt: Date
}

export type IUserSubscriptionCreate = {
    userId: UserId,
    authorId: UserId
}

export type ICategorySubscriptionCreate = {
    userId: UserId,
    categoryId: CategoryId
}
