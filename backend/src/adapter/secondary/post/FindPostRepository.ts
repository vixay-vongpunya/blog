import db from "@root/src/infrastructure/db/db";
import { PrismaClient } from ".prisma/client";
import { FindPostRepositoryPort } from "@root/src/application/Post/port/secondary/FindPostRepositoryPort";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { IPostSearch, IPostSearchToTalPage } from "@root/src/application/Post/domain/IPost";

export class FindPostRepository implements FindPostRepositoryPort{
    private db: PrismaClient
    private model: typeof db.post

    constructor(){
        this.db = db
        this.model = this.db.post
    }
    
    async findPostsByAuthor(authorId: string, cursor: string | undefined) {
        let posts = this.model.findMany({
            cursor: cursor ? {id: cursor} : undefined,
            take: 12,
            where:{
                authorId: authorId
            },
            select: this.postSelect(authorId),
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
                        imagePath: true,
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

    async findPostPreview(postId: string, userId: string){
        try{
            const post = await this.model.findUnique(
                {
                    where:{id: postId},
                    select: this.postSelect(userId),
                }
            )
            
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

    async findSearchTotalPages(data: IPostSearchToTalPage){
        try{
            const total= await this.model.count(
                {
                    where:{
                        title: {
                            contains: data.keyword,
                            mode: 'insensitive',
                        },
                    },
                    orderBy:{
                        createdAt: data.order
                    }
                })
            return Math.ceil(total/12)
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    //able to fetch by both cursor and offset
    //or better to make seperate repo
    async findByKeyword(data: IPostSearch){
        try{
            const enabledCursor = data.cursor !== "null"
            console.log((data.page-1)*data.take)
            const posts = await this.model.findMany(
                {
                    take: data.take,
                    skip: enabledCursor? 1 : (data.page-1)*data.take,
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

    async findAuthorsByCategory(categoryId: string, cursor: string){
        try{
            const posts = await this.model.findMany({
                where:{
                    postCategories:{
                       some:{
                        categoryId: categoryId
                       } 
                    }
                },
                cursor: cursor !== "null" ? {id: cursor} : undefined,
                take: 16,
                select: {
                    author: {
                        select:{
                            id: true,
                            name: true,
                            profileImage: true,
                            bio: true,
                        }
                    }
                },
                distinct: ['authorId']

            })

            return posts
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    async findByCategory(userId: string, categoryId: string, cursor: string){
        try{
            const posts = await this.model.findMany({
                where:{
                    postCategories:{
                       some:{
                        categoryId: categoryId
                       } 
                    }
                },
                cursor: cursor !== "null" ? {id: cursor} : undefined,
                take: 16,
                select: this.postSelect(userId),
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
        imagePath: true,
        createdAt: true,
        updatedAt: true,
        author: {
            select: {
                id: true,
                name: true,
                profileImage: true,
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
        // for better UX maybe fetch this later
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