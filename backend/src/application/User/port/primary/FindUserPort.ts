import { IUser } from "../../domain/IUser";

export interface FindUserPort {
    findByEmail(email:string): Promise<IUser | null>
}