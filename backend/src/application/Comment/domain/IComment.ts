import { PostId } from "../../Post/domain/IPost"
import { UserId } from "../../User/domain/IUser"

export type CommentId = string
export type CommentContent = string
export type CommentCreatedAt = Date

export interface IComment{
    id?: CommentId,
    content: CommentContent,
    createdAt: CommentCreatedAt
    user:{
        id: string,
        displayName: string
    }
}

export interface ICommentWithReplyCount{
    id?: CommentId,
    content: CommentContent,
    createdAt: CommentCreatedAt
    user:{
        id: string,
        displayName: string
    },
    replyCount: number
}

export interface ICommentFindReply{
    commentId: CommentId;
    cursor: string | undefined;
}

export interface ICommentCreate{
    content: CommentContent;
    postId: PostId;
    userId: UserId;
    parentId: CommentId | undefined;
    replyToUserId: UserId | undefined;
}

export interface ICommentSearch{
    postId: string,
    cursor: string | undefined,
    take: number
}