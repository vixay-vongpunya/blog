import { inject, injectable } from "tsyringe";
import { UserMapper } from "../../mappers/UserMapper";
import { UserPort } from "@root/src/application/User/port/primary/UserPort";
import { IUserCreate, IUserToUI, IUserUpdate, UserId } from "@root/src/application/User/domain/IUser";


@injectable()
export class UserController{
    private userMapper: typeof UserMapper
    constructor(@inject("UserUsecase") private userUseCase: UserPort){
        this.userUseCase = userUseCase
        this.userMapper = UserMapper
    }

    async create(body: IUserCreate): Promise<IUserToUI>{
        try{
            const userDTO = this.userMapper.toDomain(body);
            const userData = await this.userUseCase.create(userDTO);
            return userData;
            
        }
        catch(error){
            throw error
        }
    }

    async update(data: IUserUpdate): Promise<any>{
        try{
            console.log("data",data)
            const user = await this.userUseCase.update(data)
            return user 
        }
        catch(error)
        {
            throw error
        }
    }

    async delete(id: UserId): Promise<{message: string}>{
        try{
            await this.userUseCase.delete(id)
            return {message: "user delete successfully"}
        }
        catch(error)
        {
            throw error
        }
    }
}