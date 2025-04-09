import { IUserCreate, IUserUpdate, UserId } from "../../domain/IUser";
import { User } from "../../domain/User";


export interface UserRepositoryPort{
    create(user: IUserCreate): Promise<User>
    update(user: IUserUpdate): Promise<User>
    delete(id: UserId): Promise<void>
}