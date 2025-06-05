import { UserEmail, UserId, UserName } from "../../domain/IUser";

export interface FindUserPort {
    findByEmail(email:UserEmail): Promise<any | null>
    findById(id:UserId): Promise<any | null>
    findByName(name: UserName): Promise<any | null>
    findByCategory(userId: string, categoryId: string, cursor: string): Promise<any>
}