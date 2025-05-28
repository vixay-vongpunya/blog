import db from "@root/src/infrastructure/db/db";
import { PrismaClient } from ".prisma/client";
import { FindPostRepositoryPort } from "@root/src/application/Post/port/secondary/FindPostRepositoryPort";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { IPostSearch } from "@root/src/application/Post/domain/IPost";

export class FindPostRepository implements FindPostRepositoryPort{
    private db: PrismaClient
    private model: typeof db.post

    constructor(){
        this.db = db
        this.model = this.db.post
    }
    
    async findPostsByUserId(userId: string): Promise<any | null> {
        //mongodb doesnt support queryRaw, only sql, postgre are supported
        // need to optimize the way of using these 2 connections

        //the content is saved with html tags need to tackle that
        let posts = this.model.findMany({
            where:{
                authorId: userId
            },
            select: this.postSelect(userId),
        })      
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

    async findRecentPosts(userId: string){
        try{
            //need to make it specifically for a user feed
            let posts = this.model.findMany({
                select: this.postSelect(userId),
                orderBy: {
                    createdAt: 'asc'
                },
                take:10,
            })    
            return posts
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    //able to fetch by both cursor and offset
    async findByKeyword(data: IPostSearch){
        try{
            const enabledCursor = data.cursor !== "null"
            const posts = await this.model.findMany(
                {
                    take: data.take,
                    skip: enabledCursor? 1 : data.page*data.take,
                    cursor: enabledCursor? {id: data.cursor} : undefined,
                    where:{
                        title: {
                            contains: data.keyword,
                            mode: 'insensitive',
                        },
                    },
                    select: this.postSelect(data.userId),
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

    async findAllPosts(userId: string){
        try{
            // might not need all data
            //this is not ideal
            let posts = this.model.findMany({
            select: this.postSelect(userId),
        })      
        return posts
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    async findByCategory(userId: string, categoryId: string){
        try{
            const posts = await this.model.findMany({
                where:{
                    postCategories:{
                       some:{
                        categoryId: categoryId
                       } 
                    }
                },
                select: this.postSelect(userId)
            })
            return posts
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    private postSelect = (userId: string) => ({
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
        //for better UX maybe fetch this later
        // here the posts are queried, then savedPosts is queried so just need to check if each 
        // of that post has userId or not
        savedPosts:{
            where: {
                userId: userId,
            },
            select:{
                id: true
            }
        }
    });
}