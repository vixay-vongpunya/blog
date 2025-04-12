import { PrismaClient } from ".prisma/client";
import { IUser, IUserUpdate, UserId } from "@root/src/application/User/domain/IUser";
import { User } from "@root/src/application/User/domain/User";
import { UserRepositoryPort } from "@root/src/application/User/port/secondary/UserRepositoryPort";
import { NotFoundError } from "@root/src/Errors/NotFound";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import db from "@root/src/infrastructure/db/db";


export class UserRepository implements UserRepositoryPort{
    private db: PrismaClient;
    private model: typeof db.user;
    constructor(){
        this.db = db
        this.model = this.db.user;
    }
    async create(user: IUser){
        try{
            let exists = await this.model.findUnique({
                where: {
                    email: user.email
                }
            })
            if(exists){
                throw new UnCaughtError('user already exists', 400)
            }

            let newUser = await this.model.create({
                data:{
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    created: user.created,
                    updated: user.updated
                }
            })

            return new User(newUser.name, newUser.email, newUser.password, newUser.created, newUser.updated, newUser.id)

        }catch(error){
            throw new UnCaughtError(error.message)
        }
    }
    async update(user: IUserUpdate){
        try{
            let exists = await this.model.findUnique({
                where:{
                    id : user.id
                }
            })
            if(!exists){
                throw new NotFoundError("user not found")
            }

            let updatedUser = await this.model.update(
                {
                    where:{
                        id: user.id
                    },
                    data: user,
                })
            return updatedUser
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    async delete(id: UserId){
        try{
            let exists = this.model.findUnique({
                where:{
                    id: id
                }
            }) 
            if (!exists){
                throw new NotFoundError("user not found")
            }

            await this.model.delete({
                where:{
                    id: id
                }
            })

        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }
}