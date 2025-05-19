import { FindUserPort } from "@root/src/application/User/port/primary/FindUserPort";
import { inject, injectable } from "tsyringe";
import { UserEmail, UserId } from "@root/src/application/User/domain/IUser";

@injectable()
export class FindUserController{
    constructor(@inject('FindUserUsecase') private findUserUseCase: FindUserPort){
        this.findUserUseCase = findUserUseCase;
    }
    async findByEmail(email:UserEmail){
        const user = await this.findUserUseCase.findByEmail(email)
        return user
    }

    async findById(id: UserId){
        const user = await this.findUserUseCase.findById(id)
        return user
    }
}