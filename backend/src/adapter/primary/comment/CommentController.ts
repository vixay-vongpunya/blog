import { ICommentCreate } from "@root/src/application/Comment/domain/IComment";
import { CommentPort } from "@root/src/application/Comment/port/primary/CommentPort";
import { PostId } from "@root/src/application/Post/domain/IPost";
import { inject, injectable } from "tsyringe";

@injectable()
export class CommentController {
    
    constructor(@inject('CommentUsecase') private commentUseCase: CommentPort){
        this.commentUseCase = commentUseCase
    }

    async create(comment: ICommentCreate){
        const newComment = await this.commentUseCase.create({
            content: comment.content,
            postId: comment.postId,
            userId: comment.userId,
            parentId: comment.parentId,
            replyToUserId: comment.replyToUserId
        })

        return newComment
    }

    async findReply(commentId: string, cursor: string){
        const data = {
            commentId: commentId,
            cursor: cursor === "undefined" ? undefined : cursor,
        }
        const comments = await this.commentUseCase.findReply(data)
        return comments
    }  

    async findByPost(postId: PostId, cursor: string, take: string){
        const data = {
            postId: postId,
            cursor: cursor === "undefined" ? undefined : cursor,
            take: Number(take)
        }
        const comments = await this.commentUseCase.findByPost(data)
        return comments
    }  
    
    async findByPostTotalCount(postId: PostId){
        const comments = await this.commentUseCase.findByPostTotalCount(postId)
        return comments
    }  
}