import { IUserCreate, IUserToUI, IUserUpdate, UserId } from "../../domain/IUser";

export interface UserPort{
    create(user: IUserCreate):Promise<IUserToUI>;
    update(user: IUserUpdate): Promise<any>;
    delete(userId: UserId): Promise<void>
}