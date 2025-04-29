import db from "@root/src/infrastructure/db/db";
import { PrismaClient } from ".prisma/client";
import { FindPostRepositoryPort } from "@root/src/application/Post/port/secondary/FindPostRepositoryPort";
import { MongoClient } from "mongodb/mongodb";
import { ObjectId } from "mongodb";
import { UnCaughtError } from "@root/src/Errors/UnCaught";

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
        let posts = await this.model.findMany({
            where:{authorId: userId},
            select:{
                id: true,
                title: true,
                preview: true,
                image: true,
                created: true,
                updated: true,
                author:{
                    select:{
                        id: true,
                        name: true,
                    }
                },
                postCategories:{
                    select:{
                        category:{
                            select:{
                                id: true,
                                name: true
                            }
                        }
                    }
                },
            }
        })

        const postList = posts.map(({postCategories, ...post})=>({
            ...post,
            categories: postCategories.map(category=>category.category)
        }))
        console.log("here posts", postList)
        // let posts = await this.mongo.db("blog")
        // .collection("post")
        // .aggregate([
        //     {
        //         $match:{authorId: new ObjectId(userId)},
        //     },{
        //         $lookup:{
        //             from: 'user',
        //             localField: 'authorId',
        //             foreignField: '_id',
        //             as: 'authorInfo'
        //         }
        //     },
        //     {
        //         $project:{
        //             id: 1,
        //             title: 1,
        //             content: {$substr: ["$content", 0, 100]},
        //             image: 1,
        //             authorId: new ObjectId(userId),
        //             created: 1,
        //             author: '$authorInfo',
        //         }
        //     },
        //     {
        //         $limit: 10
        //     }
        // ]).toArray()       
        return postList
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
                        created: true,
                        updated: true,
                        author:{
                            select:{
                                id: true,
                                name: true,
                            }
                        },
                        comments:{
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
                        }
                    }
                })
            return post
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    async findAllPosts(){
        try{
            // might not need all data
            const posts = await this.model.findMany({
                select:{
                    id: true,
                    title: true,
                    preview: true,
                    image: true,
                    created: true,
                    updated: true,
                    author:{
                        select:{
                            id: true,
                            name: true,
                        }
                    },
                    postCategories:{
                        select:{
                            category:{
                                select:{
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            })

            const postList = posts.map(({postCategories, ...post})=>({
                ...post,
                categories: postCategories.map(category=>category.category)
            }))
            return postList
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    async findPostsByCategory(categoryId: string){
        try{
            const posts = await this.model.findMany({
                where:{
                    postCategories:{
                       some:{
                        categoryId: categoryId
                       } 
                    }
                },
                select:{
                    id: true,
                    title: true,
                    preview: true,
                    image: true,
                    created: true,
                    updated: true,
                    author:{
                        select:{
                            id: true,
                            name: true,
                        }
                    },
                    postCategories:{
                        select:{
                            category:{
                                select:{
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            })

            const postList = posts.map(post=>({
                ...post,
                categories: post.postCategories.map(category=>category.category)
            }))
            console.log("categoryPost", postList)
            return postList
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }
}