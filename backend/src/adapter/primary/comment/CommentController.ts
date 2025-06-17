import { IComment, ICommentCreate } from "@root/src/application/Comment/domain/IComment";
import { CommentPort } from "@root/src/application/Comment/port/primary/CommentPort";
import { PostId } from "@root/src/application/Post/domain/IPost";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { inject, injectable } from "tsyringe";

@injectable()
export class CommentController {
    
    constructor(@inject('CommentUsecase') private commentUseCase: CommentPort){
        this.commentUseCase = commentUseCase
    }

    async create(comment: ICommentCreate){
        const newComment = this.commentUseCase.create({
            content: comment.content,
            postId: comment.postId,
            userId: comment.userId
        })

        return newComment
    }

    async findByPost(postId: PostId){
        const comments = await this.commentUseCase.findByPost(postId)
        return comments
    }       
}