import { inject, injectable } from "tsyringe";
import { UserMapper } from "../../mappers/UserMapper";
import { UserPort } from "@root/src/application/User/port/primary/UserPort";
import { IUser, IUserCreate, IUserToUI, IUserUpdate, UserId } from "@root/src/application/User/domain/IUser";


@injectable()
export class UserController{
    private userMapper: typeof UserMapper
    constructor(@inject("UserUseCase") private user: UserPort){
        this.user = user
        this.userMapper = UserMapper
    }

    async create(body: IUserCreate): Promise<IUserToUI>{
        try{
            const userDTO = this.userMapper.toDomain(body);
            const userData = await this.user.create(userDTO);
            return userData;
            
        }
        catch(error){
            throw error
        }
    }

    async update(body: IUserUpdate): Promise<IUserToUI>{
        try{
            const user = await this.user.update(body)
            return user 
        }
        catch(error)
        {
            throw error
        }
    }

    async delete(id: UserId): Promise<{message: string}>{
        try{
            await this.user.delete(id)
            return {message: "user delete successfully"}
        }
        catch(error)
        {
            throw error
        }
    }
}