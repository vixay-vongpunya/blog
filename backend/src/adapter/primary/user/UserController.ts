import { inject, injectable } from "tsyringe";
import { UserMapper } from "../../mappers/UserMapper";
import { UserPort } from "@root/src/application/User/port/primary/UserPort";
import { IUserToUI, IUserUpdate, UserId } from "@root/src/application/User/domain/IUser";


@injectable()
export class UserController{
    private userMapper: typeof UserMapper
    constructor(@inject("UserUsecase") private userUsecase: UserPort){
        this.userUsecase = userUsecase
        this.userMapper = UserMapper
    }

    async create(body: any): Promise<IUserToUI>{
        // because need validation?     
        const user = this.userMapper.toDomain(body);
        const userData = await this.userUsecase.create(user);
        return userData;
    }

    async update(data: IUserUpdate): Promise<any>{
        const user = await this.userUsecase.update(data)
        return user
    }

    async delete(id: UserId): Promise<{message: string}>{
        await this.userUsecase.delete(id)
        return {message: "user delete successfully"}
    }

}