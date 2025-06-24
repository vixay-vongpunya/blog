import { PostId } from "../../Post/domain/IPost"
import { UserId } from "../../User/domain/IUser"

export type CommentId = string
export type CommentContent = string
export type CommentCreatedAt = Date

export interface IComment{
    id?: CommentId,
    content: CommentContent,
    createdAt: CommentCreatedAt
}

export interface ICommentCreate{
    content: CommentContent,
    postId: PostId,
    userId: UserId
}

export interface ICommentSearch{
    postId: string,
    cursor: string | undefined,
    take: number
}