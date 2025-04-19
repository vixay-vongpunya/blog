import { AuthenticateUserPort } from "@root/src/application/User/port/primary/AuthenticateUserPort";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { inject, injectable } from "tsyringe";
import { UserMapper } from "../../mappers/UserMapper";
import { IUser, IUserToUI, IUserToUINoPassword } from "@root/src/application/User/domain/IUser";

@injectable()
export class AuthUserController{
    userMapper: typeof UserMapper
    constructor(@inject("AuthenticateUserUseCase") private authenticateUser: AuthenticateUserPort){
        this.authenticateUser = authenticateUser
        this.userMapper = UserMapper
    }
    async login(email:string, password: string){
        try{
            const token = await this.authenticateUser.login(email, password)
            return {token:token}

        }
        catch(error){
            throw new UnCaughtError(error.message, error.status)
        }
    }

    async authenticate(token: string):Promise<IUserToUINoPassword>{
        try{
            let user = await this.authenticateUser.authenticate(token)
            return {id: user.id, name: user.name, email: user.email, created: user.created, updated: user.updated}

        }
        catch(error){
            throw new UnCaughtError(error.message, error.status)
        }
    }
}