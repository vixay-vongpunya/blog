import { AuthenticateUserPort } from "@root/src/application/User/port/primary/AuthenticateUserPort";
import { inject, injectable } from "tsyringe";
import { UserMapper } from "../../mappers/UserMapper";

@injectable()
export class AuthUserController{
    userMapper: typeof UserMapper
    constructor(@inject("AuthenticateUserUsecase") private authenticateUserUsecase: AuthenticateUserPort){
        this.userMapper = UserMapper
    }

    async login(email:string, password: string){
        const token = await this.authenticateUserUsecase.login(email, password)
        return {token:token}
    }

    async authenticate(token: string){
        // only id in this user
        let user = await this.authenticateUserUsecase.authenticate(token)
        return user

    }
}