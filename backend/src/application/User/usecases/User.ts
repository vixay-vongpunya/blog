import { inject, injectable } from "tsyringe";
import { UserPort } from "../port/primary/UserPort";
import { UserRepositoryPort } from "../port/secondary/UserRepositoryPort";
import { IUserCreate, IUserUpdate, UserId } from "../domain/IUser";
import { UserMapper } from "@root/src/adapter/mappers/UserMapper";
import { UnCaughtError } from "@root/src/Errors/UnCaught";
import { hashPassword } from "../../helpers/password_utility";
import { User } from "../domain/User";
import { UserCreatedEvent } from "../domain/UserEvent";

@injectable()
export class UserUsecase implements UserPort{
    private userMapper : typeof UserMapper
    hashPassword: typeof hashPassword
    constructor(@inject("UserRepository") private userRepository: UserRepositoryPort, ){
            // @inject("UserEventHandler") private userEventHandler: UserEventHandlerPort){
        this.userRepository = userRepository;
        this.userMapper = UserMapper;
        this.hashPassword = hashPassword;
    }
    
    async create(userData: IUserCreate){
        try{
            userData.password = await this.hashPassword(userData.password)
            // do this when wanna call events 
            // to make sure the data provided are in the format of userData doamin
            // also i will add validation to domain later so this will also check for validation
            let user = new User(userData.name, userData.displayName, userData.email, userData.password) 
            // then i map it to match the db schema
            const persist = await this.userRepository.create(this.userMapper.toPersistence(user))

            user.addEvents(new UserCreatedEvent(persist.id, persist.displayName, persist.email))
            // instantly trigger to test. better not to do it this way
            // this.userEventHandler.handle(user.events[0])
            //events happens here
            return this.userMapper.toUI(persist)
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