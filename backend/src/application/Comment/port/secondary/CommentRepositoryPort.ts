import { IComment, ICommentCreate, ICommentFindReply, ICommentSearch } from "../../domain/IComment";

export interface CommentRepositoryPort {
    create(comment: ICommentCreate): Promise<IComment>;
    findReply(data: ICommentFindReply): Promise<IComment[]>;
    findReplyCountByGroup(parentIds: string[]): Promise<any>;
    findAllReply(parentIds: string[]): Promise<{id: string, parentId: string}[]>;
    findByPost(data: ICommentSearch): Promise<IComment[]>;
    findByPostTotalCount(postId: string): Promise<number>;
}