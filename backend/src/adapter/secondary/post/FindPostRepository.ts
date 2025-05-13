import db from "@root/src/infrastructure/db/db";
import { PrismaClient } from ".prisma/client";
import { FindPostRepositoryPort } from "@root/src/application/Post/port/secondary/FindPostRepositoryPort";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { IPostSearch } from "@root/src/application/Post/domain/IPost";

export const postSelect = {
    id: true,
    title: true,
    preview: true,
    image: true,
    createdAt: true,
    updatedAt: true,
    author: {
      select: {
        id: true,
        name: true,
      },
    },
    postCategories: {
      select: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    },
};
  

export class FindPostRepository implements FindPostRepositoryPort{
    private db: PrismaClient
    private model: typeof db.post
    private postSelect = postSelect

    constructor(){
        this.db = db
        this.model = this.db.post
    }

    private async findPostsByFilter(filter: Record<string, any>, select: typeof postSelect= this.postSelect){
        try{
            const posts = await this.model.findMany({
                where: filter,
                select: select
            })

            return posts
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }
    
    async findPostsByUserId(userId: string): Promise<any | null> {
        //mongodb doesnt support queryRaw, only sql, postgre are supported
        // need to optimize the way of using these 2 connections

        //the content is saved with html tags need to tackle that
        let posts = this.findPostsByFilter({authorId: userId})      
        return posts
    }

    async findPost(postId: string){
        try{
            const post = await this.model.findUnique(
                {
                    where:{id: postId},
                    select:{
                        id: true,
                        title: true,
                        content: true,
                        image: true,
                        createdAt: true,
                        updatedAt: true,
                        author:{
                            select:{
                                id: true,
                                name: true,
                            }
                        },
                    }
                })
            return post
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    async findByKeyword(data: IPostSearch){
        try{
            const posts = await this.model.findMany(
                {
                    take: 12,
                    skip:1,
                    cursor: data.cursor !== "null" ? {id: data.cursor} : undefined,
                    where:{
                        title: {
                            contains: data.keyword,
                            mode: 'insensitive',
                        },
                    },
                    select: this.postSelect,
                    orderBy:{
                        createdAt: data.order
                    }
                })
            return posts
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    async findAllPosts(){
        try{
            // might not need all data
            //this is not ideal
            let posts = this.findPostsByFilter({})      
            return posts
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    async findByCategory(categoryId: string){
        try{
            const posts = await this.model.findMany({
                where:{
                    postCategories:{
                       some:{
                        categoryId: categoryId
                       } 
                    }
                },
                select: this.postSelect
            })
            console.log("data", posts)
            return posts
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }
}