import { IUserCreate, IUserToUI } from "../../domain/IUser";

export interface CreateUserPort{
    create(user: IUserCreate):Promise<IUserToUI>;
}