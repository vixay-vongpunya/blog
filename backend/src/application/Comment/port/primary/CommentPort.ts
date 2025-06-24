import { IComment, ICommentCreate, ICommentSearch } from "../../domain/IComment";

export interface CommentPort {
    create(comment: ICommentCreate): Promise<IComment>;
    findByPost(data: ICommentSearch): Promise<IComment[]>;
    findByPostTotalCount(postId: string): Promise<number>
}