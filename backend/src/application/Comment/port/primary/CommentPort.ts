import { IComment, ICommentCreate, ICommentFindReply, ICommentSearch } from "../../domain/IComment";

export interface CommentPort {
    create(comment: ICommentCreate): Promise<IComment>;
    findReply(data: ICommentFindReply): Promise<IComment[]>;
    findByPost(data: ICommentSearch): Promise<IComment[]>;
    findByPostTotalCount(postId: string): Promise<number>
}