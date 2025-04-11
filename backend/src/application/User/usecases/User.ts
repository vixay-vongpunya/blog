import { inject, injectable } from "tsyringe";
import { UserPort } from "../port/primary/UserPort";
import { UserRepositoryPort } from "../port/secondary/UserRepositoryPort";
import { IUserCreate, IUserUpdate, UserId } from "../domain/IUser";
import { UserMapper } from "@root/src/adapter/mappers/UserMapper";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { hashPassword } from "../../helpers/password_utility";
import { User } from "../domain/User";

@injectable()
export class UserUseCase implements UserPort{
    private userMapper : typeof UserMapper
    hashPassword: typeof hashPassword
    constructor(@inject("UserRepository") private userRepository: UserRepositoryPort){
        this.userRepository = userRepository;
        this.userMapper = UserMapper;
        this.hashPassword = hashPassword;
    }
    async create(user: IUserCreate){
        try{
            user.password = await this.hashPassword(user.password)
            let userData = new User(user.name, user.email, user.password, new Date(), new Date()) 
            const persist = await this.userRepository.create(this.userMapper.toPersistence(userData))
            
            //events happens here
            return UserMapper.toUI(persist)
        }
        catch(error: any){
            throw new UnCaughtError(error.message)
        }
    }
    async update(user: IUserUpdate){
        try{
            if(user.password){
                user.password = await this.hashPassword(user.password)
            }
            user.updated = new Date()

            let persist = await this.userRepository.update(user)
            return persist
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }
    async delete(id: UserId){
        try{
            await this.userRepository.delete(id)
        }
        catch(error){
            throw new UnCaughtError(error.message)
        }
    }
}