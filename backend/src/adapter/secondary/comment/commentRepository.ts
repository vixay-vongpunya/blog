import { PrismaClient } from ".prisma/client"
import { IComment, ICommentCreate, ICommentFindReply, ICommentSearch } from "@root/src/application/Comment/domain/IComment"
import { CommentRepositoryPort } from "@root/src/application/Comment/port/secondary/CommentRepositoryPort"
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
            data: {
                content: comment.content,
                postId: comment.postId,
                userId: comment.userId,
                //so this will work with other db too
                parentId: comment.parentId ? comment.parentId : null,
                replyToUserId: comment.replyToUserId ? comment.replyToUserId : null
            },
            select:{
                id: true,
                content: true,
                createdAt: true,
                user:{
                    select:{
                        id: true,
                        displayName: true,
                    }
                }
            }
        })
        
        return newComment
    }

    async findReply(data: ICommentFindReply){
        const replies = await this.model.findMany({
            where: {
                parentId: data.commentId,
            },
            cursor: data.cursor ? {id: data.cursor} : undefined,
            take: 12,
            select: {
                id: true,
                content: true,
                createdAt: true,
                parentId: true,
                user:{
                    select:{
                        id: true,
                        displayName: true,
                    }
                },
                replyToUser:{
                    select:{
                        id: true,
                        name: true,
                        displayName: true,
                    }
                }
            },
            orderBy:{
                createdAt: 'asc'
            }
        })

        return replies
    }

    async findReplyCount(commentId: string){
        const totalCount = await this.model.count({
            where: {
                parentId: commentId,
            },
        })

        return totalCount
    }

    async findByPost(data: ICommentSearch){
        const comments = await this.model.findMany({
            where:{
                AND: {
                    postId: data.postId,
                    parentId: null,
                }
            },
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
                        displayName: true,
                    }
                },
                parentId: true
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
