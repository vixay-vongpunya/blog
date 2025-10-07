import { CategoryId } from "../category/types"
import { Author, UserId } from "../user/types"

type SubscriptionId= string

export type Subscription = {
    id: string
    categoryId: CategoryId,
    userId: UserId,
    createdAt: string

}

export type UserSubscriptionFollowing = {
    id: string,
    author: Author,
    subscription: {
        id: string
    }

}