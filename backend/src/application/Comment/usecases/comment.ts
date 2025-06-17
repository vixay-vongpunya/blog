import { inject, injectable } from "tsyringe";
import { CommentRepositoryPort } from "../port/secondary/CommentRepositoryPort";
import { IComment, ICommentCreate } from "../domain/IComment";
import { UnCaughtError } from "@root/src/Errors/UnCaught";

@injectable()
export class CommentUsecase implements CommentRepositoryPort{
    constructor(@inject("CommentRepository") private commentRepository: CommentRepositoryPort){
        this.commentRepository = commentRepository
    }
    
    create(comment: ICommentCreate): Promise<IComment> {
    const commentData = this.commentRepository.create(comment)
        return commentData
    }

    findByPost(postId: string): Promise<IComment[]> {
    const commentsData = this.commentRepository.findByPost(postId)
        return commentsData
    }
}