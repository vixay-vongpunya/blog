import { inject, injectable } from "tsyringe";
import { UserMapper } from "../../mappers/UserMapper";
import { CreateUserPort } from "@root/src/application/User/port/primary/CreateUserPort";
import { IUserCreate, IUserToUI } from "@root/src/application/User/domain/IUser";


@injectable()
export class UserCreateController{
    private userMapper: typeof UserMapper
    constructor(@inject("CreateUserUseCase") private userCreate: CreateUserPort){
        this.userCreate = userCreate
        this.userMapper = UserMapper
    }

    async create(body: IUserCreate):Promise<IUserToUI>{
        try{
            const userDTO = this.userMapper.toDomain(body);
            const userData = await this.userCreate.create(userDTO);
            return userData;
            
        }
        catch(error){
            throw error
        }
    }

}