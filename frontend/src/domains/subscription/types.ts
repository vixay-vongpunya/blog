import { CategoryId } from "../category/types"
import { UserId } from "../user/types"

type SubscriptionId= string

export type Subscription = {
    id: string
    categoryId: CategoryId,
    userId: UserId,
    createdAt: string

}