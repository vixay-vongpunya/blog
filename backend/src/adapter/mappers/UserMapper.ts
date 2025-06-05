import { IUser, IUserToUI, IUserToUINoPassword } from "@root/src/application/User/domain/IUser";

export class UserMapper{
    static toDomain(user: any){
        return {
            name: user.name,
            displayName: user.displayName,
            email: user.email,
            password: user.password,
        }
    }

    static toUI(user: IUser):IUserToUI{
        return {
            id: user.id,
            name: user.name,
            displayName: user.displayName,
            email: user.email,
        }
    }

    static toPersistence(user: IUser){
        return {
            name: user.name,
            displayName: user.displayName,
            email: user.email,
            password: user.password,
        }
    }

}