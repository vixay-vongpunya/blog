import { inject, injectable } from "tsyringe";
import { CommentRepositoryPort } from "../port/secondary/CommentRepositoryPort";
import { IComment, ICommentCreate, ICommentFindReply, ICommentSearch } from "../domain/IComment";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { CommentPort } from "../port/primary/CommentPort";

@injectable()
export class CommentUsecase implements CommentPort{
    constructor(@inject("CommentRepository") private commentRepository: CommentRepositoryPort){
        this.commentRepository = commentRepository
    }
    
    async create(comment: ICommentCreate){
        const commentData = await this.commentRepository.create(comment)
        return commentData
    }

    async findReply(data: ICommentFindReply) {
        const replyData = await this.commentRepository.findReply(data)
        const replies = await Promise.all(replyData.map(async(reply)=>({
                ...reply,
                replyCount: await this.commentRepository.findReplyCount(reply.id)
            })    
        ))
        
        return replies
    }

    async findByPost(data: ICommentSearch): Promise<IComment[]> {
        const commentsData = await this.commentRepository.findByPost(data)
        const comments = await Promise.all(commentsData.map(async(data) => 
            ({
                ...data,
                replyCount: await this.commentRepository.findReplyCount(data.id)
            })
        ))

        return comments
    }

    async findByPostTotalCount(postId: string){
        const totalCount = await this.commentRepository.findByPostTotalCount(postId)
        return totalCount
    }
}