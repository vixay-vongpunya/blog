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
                categories:{
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

        const postList = posts.map(post=>({
            ...post,
            categories: post.categories.map(category=>category.category)
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
            console.log("he32",postId)
            const post = await this.model.findUnique({where:{id: postId}})
            return post
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }
}