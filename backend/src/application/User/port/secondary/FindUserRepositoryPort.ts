import { IUser, IUserToLogin, UserEmail, UserId } from "../../domain/IUser";

// i seperate the auth logic since it check every api, better to query less data
export interface FindUserRepositoryPort{
    findByEmailLogin(email:UserEmail): Promise<IUserToLogin | null>
    findByEmail(email: UserEmail):Promise<any | null>
    findByIdAuthenticate(id: UserId): Promise<{id: string} | null>
    findById(id: UserId): Promise<any | null>
}