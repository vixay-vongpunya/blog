import { IUserToUI, UserEmail, UserId } from "../../domain/IUser";

export interface FindUserPort {
    findByEmail(email:UserEmail): Promise<IUserToUI | null>
    findById(id:UserId): Promise<IUserToUI | null>
    findByCategory(userId: string, categoryId: string, cursor: string): Promise<any>
}