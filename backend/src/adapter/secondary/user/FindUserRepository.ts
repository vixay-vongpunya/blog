import { PrismaClient } from ".prisma/client";
import { UserId, UserName } from "@root/src/application/User/domain/IUser";
import db  from "@infrastructure/db/db";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { FindUserRepositoryPort } from "@root/src/application/User/port/secondary/FindUserRepositoryPort";

export class FindUserRepository implements FindUserRepositoryPort{
    private db: PrismaClient;
    private model: typeof this.db.user;
    
    constructor(){
        this.db = db;
        this.model = this.db.user;
    }

    async findByEmailLogin(email: string){
        const user = await this.model.findUnique({
            where : { 
                email : email
            },
            select: {
                id: true,
                password: true
            }
        })

        if(user){
            return {
                id: user.id,
                password: user.password
            }
        }

        return null
        
    } 
    
    async findByEmail(email: string){
        const user = await this.model.findUnique({
            where : { 
                email : email 
            },
            select: {
                id: true,
                name: true,
                email: true,
                profileImage: true,
                backgroundImage: true,
                bio: true,
            }
        })
        
        if(user){
            return user
        }

        return null
        
    } 

    // just need to check if exists
    async findByIdAuthenticate(id: UserId){
        const user = await this.model.findUnique({
            where:{
                id: id
            },
            select: {
                id: true
            }
        })

        if(user){
            return user
        }
        return null
    }

    async findByName(name: UserName){
        const user = await this.model.findUnique(
            {
                where: {
                    name: name
                },
                select: {
                    id: true,
                    name: true,
                    displayName: true,
                    email: true,
                    profileImage: true,
                    backgroundImage: true,
                    bio: true,
                }
            })
        console.log("j", user)
        if (!user){
            throw new UnCaughtError('user not found', 404)
        }
        console.log("2", user)
        return  user
    }

    async findById(id: UserId){
        const user = await this.model.findUnique(
            {
                where:{
                    id: id
                },
                select: {
                    id: true,
                    name: true,
                    displayName: true, 
                    email: true,
                    profileImage: true,
                    backgroundImage: true,
                    bio: true,
                }
            })
        if (user){
            return user
        }
        return null
    }
}