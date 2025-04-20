import { AuthenticateUserPort } from "@root/src/application/User/port/primary/AuthenticateUserPort";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { inject, injectable } from "tsyringe";
import { UserMapper } from "../../mappers/UserMapper";
import { IUser, IUserToUI, IUserToUINoPassword } from "@root/src/application/User/domain/IUser";

@injectable()
export class AuthUserController{
    userMapper: typeof UserMapper
    constructor(@inject("AuthenticateUserUseCase") private authenticateUserUseCase: AuthenticateUserPort){
        this.authenticateUserUseCase = authenticateUserUseCase
        this.userMapper = UserMapper
    }
    async login(email:string, password: string){
        try{
            const token = await this.authenticateUserUseCase.login(email, password)
            return {token:token}

        }
        catch(error){
            throw new UnCaughtError(error.message, error.status)
        }
    }

    async authenticate(token: string):Promise<IUserToUI>{
        try{
            let user = await this.authenticateUserUseCase.authenticate(token)
            return user

        }
        catch(error){
            throw new UnCaughtError(error.message, error.status)
        }
    }
}