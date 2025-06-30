import { IComment, ICommentCreate, ICommentFindReply, ICommentSearch } from "../../domain/IComment";

export interface CommentRepositoryPort {
    create(comment: ICommentCreate): Promise<IComment>;
    findReply(data: ICommentFindReply): Promise<IComment[]>;
    findReplyCount(commentId: string): Promise<number>
    findByPost(data: ICommentSearch): Promise<IComment[]>;
    findByPostTotalCount(postId: string): Promise<number>;
}