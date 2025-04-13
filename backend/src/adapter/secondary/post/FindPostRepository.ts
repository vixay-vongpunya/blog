import db from "@root/src/infrastructure/db/db";
import { PrismaClient } from ".prisma/client";
import { FindPostRepositoryPort } from "@root/src/application/Post/port/secondary/FindPostRepositoryPort";
import mongoClient from "@root/src/infrastructure/db/mongo";
import { MongoClient } from "mongodb/mongodb";
import { ObjectId } from "mongodb";

export class FindPostRepository implements FindPostRepositoryPort{
    private db: PrismaClient
    private mongo: MongoClient
    private post: typeof db.post
    constructor(){
        this.db = db
        this.post = this.db.post
        this.mongo = mongoClient
    }
    async findPostsByUserId(userId: string): Promise<any | null> {
        //mongodb doesnt support queryRaw, only sql, postgre are supported
        // need to optimize the way of using these 2 connections

        //the content is saved with html tags need to tackle that
        console.log(userId)
        let posts = await this.mongo.db("blog")
        .collection("post")
        .aggregate([
            {
                $match:{authorId: new ObjectId(userId)},
            },
            {
                $project:{
                    id: 1,
                    title: 1,
                    content: {$substr: ["$content", 0, 100]},
                    image: 1,
                    authorId: 1,
                }
            },
            {
                $limit: 10
            }
        ]).toArray()
       
        return posts
    }
}