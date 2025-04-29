import { IComment, ICommentCreate } from "../../domain/IComment";

export interface CommentRepositoryPort {
    create(comment: ICommentCreate): Promise<IComment>
    findByPost(postId: string): Promise<IComment[]>
}