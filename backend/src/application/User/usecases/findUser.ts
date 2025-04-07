import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { IUser } from "../domain/IUser";
import { FindUserPort } from "../port/primary/FindUserPort";
import { UserFindRespositoryPort } from "../port/secondary/UserFindRepositoryPort";
import { inject, injectable } from "tsyringe/dist/typings";
import { NotFoundError } from "@root/src/Errors/NotFound";

@injectable()
export class FindUserUseCase implements FindUserPort {
    constructor(@inject('UserFindRepository') private userFindRepository: UserFindRespositoryPort){
        this.userFindRepository = userFindRepository
    }
    async findByEmail(email: string): Promise<IUser | null> {
        try{
            let user = this.userFindRepository.findByEmail(email)
            if(!user){
                throw new NotFoundError("user not found")
            }
            return user

        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }
}