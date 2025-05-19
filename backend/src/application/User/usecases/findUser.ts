import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { IUser, IUserToUI, UserId } from "../domain/IUser";
import { FindUserPort } from "../port/primary/FindUserPort";
import { UserFindRespositoryPort } from "../port/secondary/UserFindRepositoryPort";
import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@root/src/Errors/NotFound";
import { UserMapper } from "@root/src/adapter/mappers/UserMapper";

@injectable()
export class FindUserUsecase implements FindUserPort {
    private userMapper: typeof UserMapper
    constructor(@inject('UserFindRepository') private userFindRepository: UserFindRespositoryPort){
        this.userFindRepository = userFindRepository
        this.userMapper = UserMapper
    }
    async findByEmail(email: string): Promise<IUserToUI | null> {
        try{
            let user = await this.userFindRepository.findByEmail(email)
            if(!user){
                throw new NotFoundError("user not found")
            }
            return this.userMapper.toUI(user)

        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }

    async findById(id: UserId):Promise<IUserToUI | null>{
        try{
            const user = await this.userFindRepository.findById(id)
            if(!user){
                throw new NotFoundError("user not found")
            }
            return this.userMapper.toUI(user)
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }
}