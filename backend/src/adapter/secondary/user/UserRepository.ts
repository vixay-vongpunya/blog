import { PrismaClient } from ".prisma/client";
import { IUserCreate, IUserUpdate, UserId } from "@root/src/application/User/domain/IUser";
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
    async create(user: IUserCreate){
                    // need to make sure there is no space in name and all lowercase
        let nameExist = await this.model.findUnique({
            where: {
                name: user.name
            }
        })

        if(nameExist){
            throw new UnCaughtError('name is used', 400)
        }

        let exist = await this.model.findUnique({
            where: {
                email: user.email
            }
        })

        if(exist){
            throw new UnCaughtError('user already exists', 400)
        }

        let newUser = await this.model.create({
            data:{
                name: user.name,
                displayName: user.displayName,
                email: user.email,
                password: user.password,
            }
        })

        return new User(newUser.name, newUser.displayName, newUser.email, newUser.id, undefined, undefined, undefined)

    }

    async update(user: IUserUpdate){
        const {id, ...data} = user
        let exists = await this.model.findUnique({
            where:{
                id : id
            }
        })
        if(!exists){
            throw new NotFoundError("user not found")
        }

        let updatedUser = await this.model.update(
            {
                where:{
                    id: id
                },
                data: data,
            })
        return new User(updatedUser.name, updatedUser.displayName, updatedUser.email, updatedUser.id, undefined, undefined, undefined)
    }

    async delete(id: UserId){
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
}