
export type UserId = string;
export type UserName = string;
export type UserDisplayName = string;
export type UserEmail = string;
export type UserPassword = string;
export type UserProfileImage = string;
export type UserBackgroundImage = string;
export type UserCreatedAt = Date;
export type UserUpdatedAt = Date;

export interface IUser{
    id?: UserId,
    name: UserName,
    displayName: UserDisplayName,
    email: UserEmail,
}

export interface IUserCreate{
    name: UserName,
    displayName: string,
    email: UserEmail,
    password: UserPassword,
}

export interface IUserUpdate{
    id: UserId,
    displayName?: UserDisplayName,
    name?: UserName,
    email?: UserEmail,
    profileImage?: UserProfileImage,
    backgroundImage?: UserBackgroundImage,
}

export interface IUserToLogin{
    id: UserId,
    password: UserPassword
}

export interface IUserToUI{
    id: UserId,
    name: UserName,
    displayName: UserDisplayName,
    email: UserEmail,
}

export interface IUserToUINoPassword{
    id: UserId,
    name: UserName,
    displayName: UserDisplayName,
    email: UserEmail,
}

