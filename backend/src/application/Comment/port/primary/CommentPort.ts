import { IComment, ICommentCreate } from "../../domain/IComment";

export interface CommentPort {
    create(comment: ICommentCreate): Promise<IComment>
}