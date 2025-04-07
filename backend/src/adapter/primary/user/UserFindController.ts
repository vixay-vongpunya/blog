import { FindUserPort } from "@root/src/application/User/port/primary/FindUserPort";
import { inject, injectable } from "tsyringe/dist/typings";
import { UserMapper } from "../../mappers/UserMapper";

@injectable()
export class UserFindController{
    private userMapper: typeof UserMapper
    constructor(@inject('FindUserUseCase') private findUserUseCase: FindUserPort){
        this.findUserUseCase = findUserUseCase;
        this.userMapper = UserMapper
    }
    async findByEmail(email:string){
        const user = await this.findUserUseCase.findByEmail(email)
        return this.userMapper.toUI(user)
        
    }
}