import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { AuthenticateUserPort } from "../port/primary/AuthenticateUserPort";
import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@root/src/Errors/NotFound";
import { comparePassword } from "../../helpers/password_utility";
import { generateToken, verifyToken } from "../../helpers/jwt_utility";
import { FindUserRepositoryPort } from "../port/secondary/FindUserRepositoryPort";
import { UnAuthorizedError } from "@root/src/Errors/UnAuthorized";

@injectable()
export class AuthenticateUserUsecase implements AuthenticateUserPort {
    comparePassword: typeof comparePassword
    generateToken: typeof generateToken
    verifyToken: typeof verifyToken
    constructor(@inject("FindUserRepository") private findUserRepository: FindUserRepositoryPort){
        this.comparePassword = comparePassword
        this.generateToken = generateToken
        this.verifyToken = verifyToken
    }

    async login(email:string, password:string){
        let user = await this.findUserRepository.findByEmailLogin(email)
        if (!user){
            throw new NotFoundError("ユーザが見つかりません")
        }
        
        let isPasswordValid = await this.comparePassword(password, user.password)
        if(!isPasswordValid){
            throw new UnAuthorizedError("メールアドレスまたはパスワードが正しくありません")
        }

        let token = await this.generateToken({id: user.id ? user.id : ""})
        return token
    }

    async authenticate(token: string){
        let decoded = await this.verifyToken(token);
        // need to check user everytime not just simply get the id to authenticate user
        let user = await this.findUserRepository.findById((decoded.payload as {id: string}).id)
        if (!user) {
            throw new NotFoundError("ユーザが見つかりません")
        }
        return {id: user.id}    
    }
}