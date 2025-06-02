import { IUser, UserCreated, UserEmail, UserId, UserName, UserPassword, UserUpdated } from "./IUser";


export class User implements IUser{
    public id: UserId;
    public name: UserName;
    public email: UserEmail;
    public password: UserPassword;
    public created: UserCreated;
    public updated: UserUpdated

    constructor(name: UserName, email: UserEmail, created:UserCreated, updated: UserUpdated, id?: UserId, password?: UserPassword,){
        
        this.name = name;
        this.email = email;
        this.created = created; 
        this.updated = updated;
        if(id){
            this.id = id;
        }

        if(password) {
            this.password = password;
        }
    }

}