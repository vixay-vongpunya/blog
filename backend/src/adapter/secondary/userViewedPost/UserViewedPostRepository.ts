import { PrismaClient } from ".prisma/client"
import db  from "@infrastructure/db/db";
import { IUserViewedPost } from "@root/src/application/UserViewedPost/domain/IUserViewedPost";

export class UserViewedPostRepository{
    private db: PrismaClient;   
    private model: typeof db.userViewedPost;
    constructor(){
        this.db = db
        this.model =this.db.userViewedPost
    }

    async create(data: IUserViewedPost){
        console.log("at viewed created", data)
        await this.model.create({
            data: data
        })
    }

    async find(userId: string){
        const data = await this.model.findMany({
            where:{
                userId: userId
            },
            select:{
                postId: true,
            },
            orderBy: {
                createdAt: "desc"
            },
            distinct:['postId'],
            take: 5
        })
        return data
    }
}