import { inject, injectable } from "tsyringe";
import { UserPort } from "../port/primary/UserPort";
import { UserRepositoryPort } from "../port/secondary/UserRepositoryPort";
import { IUserCreate, IUserUpdate, UserId } from "../domain/IUser";
import { UserMapper } from "@root/src/adapter/mappers/UserMapper";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { hashPassword } from "../../helpers/password_utility";
import { User } from "../domain/User";

@injectable()
export class UserUsecase implements UserPort{
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
            // do this when wanna call events 
            // to make sure the data provided are in the format of User doamin
            // also i will add validation to domain later so this will also check for validation
            let userData = new User(user.name, user.email, new Date(), new Date(), user.password) 
            // then i map it to match the db schema
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
            // if(user.password){
            //     user.password = await this.hashPassword(user.password)
            // }

            let persist = await this.userRepository.update(user)
            const userData = {
                ...persist,
                profileImage: persist.profileImage ? `http://localhost:4000/public/users/profileImages/${persist.profileImage}` : null,
                backgroundImage: persist.backgroundImage ? `http://localhost:4000/public/users/backgroundImages/${persist.backgroundImage}` : null,
            }
            return userData
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