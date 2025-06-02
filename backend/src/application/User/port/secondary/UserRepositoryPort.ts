import { IUserCreate, IUserUpdate, UserId } from "../../domain/IUser";
import { User } from "../../domain/User";


export interface UserRepositoryPort{
    create(user: IUserCreate): Promise<any>
    update(user: IUserUpdate): Promise<any>
    delete(id: UserId): Promise<void>
}