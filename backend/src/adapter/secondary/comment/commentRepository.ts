import { PrismaClient } from ".prisma/client"
import { IComment, ICommentCreate } from "@root/src/application/Comment/domain/IComment"
import { CommentRepositoryPort } from "@root/src/application/Comment/port/secondary/CommentRepositoryPort"
import { UnCaughtError } from "@root/src/Errors/UnCaught"
import db from "@root/src/infrastructure/db/db"


export class CommentRepository implements CommentRepositoryPort{
    private db: PrismaClient
    private model: typeof db.comment
    constructor(){
        this.db = db
        this.model = this.db.comment
    }
    async create(comment: ICommentCreate): Promise<IComment> {
                    const newComment = await this.model.create({
                data:{
                    content: comment.content,
                    userId: comment.userId,
                    postId: comment.postId
                }
            })
            
            return newComment
        }

    async findByPost(postId: string): Promise<IComment[]> {
        const comments = await this.model.findMany({
            where:{postId: postId},
            select:{
                id: true,
                content: true,
                createdAt: true,
                user:{
                    select:{
                        id: true,
                        name: true,
                    }
                }
            }
        })
        console.log(comments)

        return comments
    }
}
