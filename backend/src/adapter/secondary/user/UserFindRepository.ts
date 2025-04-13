import { PrismaClient } from ".prisma/client";
import { IUser, UserId } from "@root/src/application/User/domain/IUser";
import { UserFindRespositoryPort } from "@root/src/application/User/port/secondary/UserFindRepositoryPort";
import db  from "@infrastructure/db/db";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { User } from "@root/src/application/User/domain/User";

export class UserFindRespository implements UserFindRespositoryPort{
    private db: PrismaClient;
    private model: typeof this.db.user;
    
    constructor(){
        this.db = db;
        this.model = this.db.user;
    }
    async findByEmail(email: string): Promise<IUser | null> {
        try{
            const user = await this.model.findUnique({where : { email : email }})
            if(user){
                return new User(user.name, user.email, user.password, user.updated, user.created, user.id )
            }

            return null
            
        }catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    async findById(id: UserId):Promise<IUser | null>{
        try{
            const user = await this.model.findUnique({where:{id: id}})
            if (user){
                return new User(user.name, user.email, user.password, user.updated, user.created, user.id )
            }
            return null
        }
        catch(error){
            console.log(error)
            throw new UnCaughtError(error.message)
        }
    }
}