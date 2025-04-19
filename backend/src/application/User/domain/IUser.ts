
export type UserId = string;
export type UserName = string;
export type UserEmail = string;
export type UserPassword = string;
export type UserCreated = Date;
export type UserUpdated = Date;
export interface IUser{
    id?: UserId,
    name: UserName,
    email: UserEmail,
    password: UserPassword,
    created: UserCreated,
    updated: UserUpdated
}

export interface IUserCreate{
    name: UserName,
    email: UserEmail,
    password: UserPassword,
}

export interface IUserUpdate{
    id: UserId,
    name?: UserName,
    email?: UserEmail,
    password?: UserPassword,
    created?: UserCreated,
    updated?: UserUpdated
}

export interface IUserToUI{
    id: UserId,
    name: UserName,
    password: UserPassword,
    email: UserEmail,
    created: UserCreated,
    updated: UserUpdated
}

export interface IUserToUINoPassword{
    id: UserId,
    name: UserName,
    email: UserEmail,
    created: UserCreated,
    updated: UserUpdated
}

