import { IUser, UserEmail, UserId, UserName, UserPassword } from "./IUser";


export class User implements IUser{
    public id: UserId;
    public name: UserName;
    public email: UserEmail;
    public password: UserPassword;

    constructor(id: UserId, name: UserName, email: UserEmail, password: UserPassword){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

}