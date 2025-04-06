import { PrismaClient } from ".prisma/client";
import { IUserCreate } from "@root/src/application/User/domain/IUser";
import { User } from "@root/src/application/User/domain/User";
import { UserRepositoryPort } from "@root/src/application/User/port/secondary/UserRepositoryPort";
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
        try{
            let exists = await this.model.findUnique({where: {email: user.email}})
            if(exists){
                console.log("eroor")
                throw new UnCaughtError('user already exists', 400)
            }

            let newUser = await this.model.create({
                data:{
                    name: user.name,
                    email: user.email,
                    password: user.password,
                }
            })

            return new User(newUser.id, newUser.name, newUser.email, newUser.password)

        }catch(error){
            throw new UnCaughtError(error.message)
        }
    }
}