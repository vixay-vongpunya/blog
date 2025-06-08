import { inject, injectable } from "tsyringe";
import { UserMapper } from "../../mappers/UserMapper";
import { UserPort } from "@root/src/application/User/port/primary/UserPort";
import { IUserCreate, IUserToUI, IUserUpdate, UserId } from "@root/src/application/User/domain/IUser";


@injectable()
export class UserController{
    private userMapper: typeof UserMapper
    constructor(@inject("UserUsecase") private userUsecase: UserPort){
        this.userUsecase = userUsecase
        this.userMapper = UserMapper
    }

    async create(body: any): Promise<IUserToUI>{
        try{
            // because need validation?     
            const user = this.userMapper.toDomain(body);
            const userData = await this.userUsecase.create(user);
            return userData;
        }
        catch(error){
            throw error
        }
    }

    async update(data: IUserUpdate): Promise<any>{
        try{
            const user = await this.userUsecase.update(data)
            return user
        }
        catch(error)
        {
            throw error
        }
    }

    async delete(id: UserId): Promise<{message: string}>{
        try{
            await this.userUsecase.delete(id)
            return {message: "user delete successfully"}
        }
        catch(error)
        {
            throw error
        }
    }
}