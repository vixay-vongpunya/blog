import { PostId } from "../post/types";
import { User } from "../user/types";

type CommentId = string
type CommentContent = string
type CommentCreatedAt = Date

export type Comment = {
    id: CommentId;
    content: CommentContent;
    createdAt: CommentCreatedAt;
    user: User;
    ReplyCount?: number;
}

export type CommentCreate = {
    content: CommentContent;
    postId: PostId;
    grandParentId: string | null;
    parentId: string | null;
    replyToUserId: string | null;
}