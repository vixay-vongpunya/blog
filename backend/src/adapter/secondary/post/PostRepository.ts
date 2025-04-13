import { PrismaClient } from "@prisma/client/default";
import { IPostCreate, IPostUpdate } from "@root/src/application/Post/domain/IPost";
import { Post } from "@root/src/application/Post/domain/Post";
import { PostRepositoryPort } from "@root/src/application/Post/port/secondary/PostRepositoryPort";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import db from "@root/src/infrastructure/db/db";

export class PostRepository implements PostRepositoryPort{
    private db: PrismaClient
    private model: typeof db.post
    constructor(){
        this.db = db
        this.model = this.db.post
    }
    async create(post: IPostCreate){
        try{
            let newPost = await this.model.create({
                data:{
                    title: post.title,
                    content: post.content,
                    image: null,
                    authorId: post.authorId
                }
            })

            return new Post(newPost.title, newPost.content, newPost.authorId, 
                newPost.image, newPost.created, newPost.updated, newPost.id)
        }
        catch(error){

        }
    }
    async update(post: IPostUpdate){
        try{

            let newPost = await this.model.update({
                where: {
                    id: post.id
                },
                data: {
                    title: post?.title,
                    content: post?.content,
                    image: post?.image,
                }
            })

            return new Post(newPost.title, newPost.content, newPost.authorId, 
                newPost.image, newPost.created, newPost.updated, newPost.id)
        }
        catch(error){
            throw new UnCaughtError(error.message)

        }
    }
}