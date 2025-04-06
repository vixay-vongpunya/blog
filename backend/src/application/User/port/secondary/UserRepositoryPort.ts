import { IUserCreate } from "../../domain/IUser";
import { User } from "../../domain/User";


export interface UserRepositoryPort{
    create(user: IUserCreate): Promise<User>
}