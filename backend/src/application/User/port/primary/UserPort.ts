import { IUserCreate, IUserToUI, IUserUpdate, UserId } from "../../domain/IUser";

export interface UserPort{
    create(user: IUserCreate):Promise<IUserToUI>;
    update(user: IUserUpdate): Promise<IUserToUI>;
    delete(userId: UserId): Promise<void>
}