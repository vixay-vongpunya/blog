import { inject, injectable } from "tsyringe";
import { CreateUserPort } from "../port/primary/CreateUserPort";
import { UserRepositoryPort } from "../port/secondary/UserRepositoryPort";
import { IUserCreate } from "../domain/IUser";
import { UserMapper } from "@root/src/adapter/mappers/UserMapper";
import { UnCaughtError } from "@root/src/Errors/UnCaught";

@injectable()
export class CreateUserUseCase implements CreateUserPort{
    private userMapper : typeof UserMapper
    constructor(@inject("UserRepository") private userRepository: UserRepositoryPort){
        this.userRepository = userRepository;
        this.userMapper = UserMapper;
    }
    async create(user: IUserCreate){
        try{

            const persist = await this.userRepository.create(user)
 
            //events happens here
            return UserMapper.toUI(persist)
        }
        catch(error: any){
            throw new UnCaughtError(error.message)
        }
    }
}