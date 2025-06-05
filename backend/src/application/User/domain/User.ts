import { IUser, UserCreatedAt, UserDisplayName, UserEmail, UserId, UserName, UserPassword, UserUpdatedAt } from "./IUser";
import { IUserEvent } from "./UserEvent";

export class User implements IUser{
    public id?: UserId;
    public name: UserName;
    public displayName: UserDisplayName;
    public email: UserEmail;
    public password?: UserPassword;
    public createdAt?: UserCreatedAt;
    public updatedAt?: UserUpdatedAt;
    public events: IUserEvent[] = [];

    constructor(name: UserName, displayName: UserDisplayName, email: UserEmail, id?: UserId, password?: UserPassword, createdAt?: UserCreatedAt, updatedAt?: UserUpdatedAt){
        this.id = id;
        this.name = name;
        this.displayName = displayName;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt; 
        this.updatedAt = updatedAt;       
    }

    async domainEvents(): Promise<IUserEvent[]>{
        return this.events;
    }

    async clearEvents(): Promise<void>{
        this.events = [];
    }

    async addEvents(event: IUserEvent): Promise<void>{
        this.events.push(event)
    }

}