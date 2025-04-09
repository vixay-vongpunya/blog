import { IUser, UserEmail, UserId } from "../../domain/IUser";


export interface UserFindRespositoryPort{
    findByEmail(email: UserEmail):Promise<IUser | null>
    findById(id: UserId): Promise<IUser | null>
}