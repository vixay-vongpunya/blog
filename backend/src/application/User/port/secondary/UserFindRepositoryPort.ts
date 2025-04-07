import { IUser } from "../../domain/IUser";


export interface UserFindRespositoryPort{
    findByEmail(email:string):Promise<IUser|null>
}