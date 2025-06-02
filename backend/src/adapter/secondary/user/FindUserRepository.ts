import { PrismaClient } from ".prisma/client";
import { UserId } from "@root/src/application/User/domain/IUser";
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
        try{
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
            
        }catch(error){
            throw new UnCaughtError(error.message)
        }
    }
    
    async findByEmail(email: string){
        try{
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
            
        }catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    // just need to check if exists
    async findByIdAuthenticate(id: UserId){
        try{
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
        catch(error){
            console.log(error)
            throw new UnCaughtError(error.message)
        }
    }

    async findById(id: UserId){
        try{
            const user = await this.model.findUnique(
                {
                    where:{
                        id: id
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
                console.log("a", user)
            if (user){
                return user
            }
            return null
        }
        catch(error){
            console.log(error)
            throw new UnCaughtError(error.message)
        }
    }
}