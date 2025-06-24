import { PrismaClient } from ".prisma/client"
import { IComment, ICommentCreate, ICommentSearch } from "@root/src/application/Comment/domain/IComment"
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
    async create(comment: ICommentCreate){
                    const newComment = await this.model.create({
                data:{
                    content: comment.content,
                    userId: comment.userId,
                    postId: comment.postId
                }
            })
            
            return newComment
        }

    async findByPost(data: ICommentSearch){
        const comments = await this.model.findMany({
            where:{postId: data.postId},
            cursor: data.cursor ? {id: data.cursor} : undefined,
            take: data.take,
            skip: data.cursor ? 1 : 0,
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
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        console.log(comments)

        return comments
    }

    async findByPostTotalCount(postId: string) {
        const totalCount = await this.model.count({
            where:{postId: postId},
        })
        console.log(totalCount)
        return totalCount
    }
}
