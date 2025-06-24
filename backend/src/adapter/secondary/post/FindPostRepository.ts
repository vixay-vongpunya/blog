import db from "@root/src/infrastructure/db/db";
import { Prisma, PrismaClient } from ".prisma/client";
import { FindPostRepositoryPort } from "@root/src/application/Post/port/secondary/FindPostRepositoryPort";
import { IPostsByAuthors } from "@root/src/application/Post/domain/IPost";

export class FindPostRepository implements FindPostRepositoryPort{
    private db: PrismaClient
    private model: typeof db.post

    constructor(){
        this.db = db
        this.model = this.db.post
    }

    async findPost(userId: string, postId: string){
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
                            profileImage: true,
                        }
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
                    savedPosts:{
                        where: {
                            userId: userId,
                        },
                        select:{
                            id: true
                        }
                    }
                }
            })
        console.log(post)
        return post
    }
    
    // authorId passed to postSelect is wrong should be userId
    async findPostsByAuthor(authorId: string, cursor: string | undefined) {
        let posts = this.model.findMany({
            cursor: cursor ? {id: cursor} : undefined,
            take: 12,
            where:{
                authorId: authorId
            },
            select: this.postSelect(authorId),
            orderBy: {
                createdAt: 'desc'
            }
        })      
        return posts
    }

    async findPostsByAuthors(data: IPostsByAuthors) {
        let posts = this.model.findMany({
            cursor: data.cursor ? {id: data.cursor} : undefined,
            take: 12,
            where:{
                authorId: {in: data.authorIds}
            },
            select: this.postSelect(data.userId),
            orderBy: {
                createdAt: 'desc'
            }
        })      
        return posts
    }

    //for semantic func
    async findPostPreview(postId: string, userId: string){
        const post = await this.model.findUnique(
            {
                where:{id: postId},
                select: this.postSelect(userId),
            }
        )
        
        return post
    }

    async findRecentPosts(userId: string){
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

    // async findSearchTotalPages(data: IPostSearchToTalPage){
    //     const total= await this.model.count(
    //         {
    //             where:{
    //                 title: {
    //                     contains: data.query,
    //                     mode: 'insensitive',
    //                 },
    //             },
    //             orderBy:{
    //                 createdAt: data.order
    //             }
    //         })
    //     return Math.ceil(total/12)
    // }

    //able to fetch by both cursor and offset
    //or better to make seperate repo
    // async findByQuery(data: IPostSearch){
    //     const enabledCursor = data.cursor !== "null"
    //     const posts = await this.model.findMany(
    //         {
    //             take: data.take,
    //             skip: enabledCursor? 1 : (data.page-1)*data.take,
    //             cursor: enabledCursor? {id: data.cursor} : undefined,
    //             where:{
    //                 title: {
    //                     contains: data.query,
    //                     mode: "insensitive"
    //                 },
    //             },
    //             select: this.postSelect(data.userId),
    //             orderBy:{
    //                 createdAt: data.order
    //             }
    //         })
    //     return posts
    // }

    async findFeedPosts(userId: string){
                    // might not need all data
        //this is not ideal
        let posts = this.model.findMany({
        select: this.postSelect(userId),
        })      
        return posts
    }

    async findFollowingPosts(userId: string){
                    // might not need all data
        //this is not ideal
        let posts = this.db.userSubscription.findMany({
            where: {
                userId: userId
            },
            select: {
                author:{
                    select:{
                        posts: {
                            select: this.postSelect(userId)
                        }
                    }
                }
            }
        })  

        return posts
    }

    async findAuthorsByCategory(categoryId: string, cursor: string){
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

    async findByCategory(userId: string, categoryId: string, cursor: string | undefined){
        const posts = await this.model.findMany({
            where:{
                postCategories:{
                    some:{
                    categoryId: categoryId
                    } 
                }
            },
            cursor: cursor && {id: cursor},
            take: 12,
            select: this.postSelect(userId),
        })
        
        return posts
    }

    private postSelect = (userId: string) => 
        Prisma.validator<Prisma.PostSelect>()({
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