import { inject, injectable } from "tsyringe";
import { CommentRepositoryPort } from "../port/secondary/CommentRepositoryPort";
import { IComment, ICommentCreate, ICommentSearch } from "../domain/IComment";
import { UnCaughtError } from "@root/src/Errors/UnCaught";

@injectable()
export class CommentUsecase implements CommentRepositoryPort{
    constructor(@inject("CommentRepository") private commentRepository: CommentRepositoryPort){
        this.commentRepository = commentRepository
    }
    
    async create(comment: ICommentCreate): Promise<IComment> {
        const commentData = this.commentRepository.create(comment)
        return commentData
    }

    async findByPost(data: ICommentSearch): Promise<IComment[]> {
        const commentsData = await this.commentRepository.findByPost(data)
        return commentsData
    }

    async findByPostTotalCount(postId: string){
        const totalCount = await this.commentRepository.findByPostTotalCount(postId)
        return totalCount
    }
}