import { inject, injectable } from "tsyringe";
import { CommentRepositoryPort } from "../port/secondary/CommentRepositoryPort";
import { IComment, ICommentCreate } from "../domain/IComment";
import { UnCaughtError } from "@root/src/Errors/UnCaught";

@injectable()
export class CommentUseCase implements CommentRepositoryPort{
    constructor(@inject("CommentRepository") private commentRepository: CommentRepositoryPort){
        this.commentRepository = commentRepository
    }
    
    create(comment: ICommentCreate): Promise<IComment> {
        try{
            const commentData = this.commentRepository.create(comment)
            return commentData
        }
        catch(error){
            new UnCaughtError(error.error)
        }
    }

    findByPost(postId: string): Promise<IComment[]> {
        try{
            const commentsData = this.commentRepository.findByPost(postId)
            return commentsData
        }
        catch(error){
            new UnCaughtError(error.error)
        }
    }
}