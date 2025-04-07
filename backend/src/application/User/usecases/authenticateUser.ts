import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { AuthenticateUserPort } from "../port/primary/AuthenticateUserPort";
import { FindUserPort } from "../port/primary/FindUserPort";
import { inject, injectable } from "tsyringe/dist/typings";
import { NotFoundError } from "@root/src/Errors/NotFound";
import { comparePassword } from "../../helpers/password_utility";
import { generateToken, verifyToken } from "../../helpers/jwt_utility";
import { IUser, IUserToUI } from "../domain/IUser";

@injectable()
export class AuthenticateUserUseCase implements AuthenticateUserPort {
    comparePassword: typeof comparePassword
    generateToken: typeof generateToken
    verifyToken: typeof verifyToken
    constructor(@inject("FindUserUseCase") private findUserUseCase: FindUserPort){
        this.findUserUseCase = findUserUseCase
        this.comparePassword = comparePassword
        this.generateToken = generateToken
        this.verifyToken = verifyToken
    }
    async login(email:string, password:string){
        try{
            let user = await this.findUserUseCase.findByEmail(email)
            if (!user){
                throw new NotFoundError("user not found")
            }

            let isPasswordValid = await this.comparePassword(password, user.password)
            if(!isPasswordValid){
                throw new UnCaughtError("Invalid Email or Password")
            }

            let token = await this.generateToken({id: user.id ? user.id : ""})
            return token

        }catch(error){
            throw new UnCaughtError(error.message)
        }

    }
    async authenticate(token: string): Promise<IUser> {
        try{
            let decoded = await this.verifyToken(token);
            let user =  await this.findUserUseCase.findByEmail((decoded.payload as {id:string}).id)

            if(!user){
                throw new NotFoundError('user not found', 404)
            }
            return user

        }
        catch(error:any){
            throw new UnCaughtError(error.message)
        }
    }
}