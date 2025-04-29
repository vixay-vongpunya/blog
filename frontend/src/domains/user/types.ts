export type UserId = string;
type UserName = string;
type UserEmail = string;
type UserPassword = string;
type UserConfirmPassword = string;
type UserCreatedAt = Date;

export type User = {
    id: UserId;
    name: UserName;
    email: UserEmail;
    createdAt: UserCreatedAt;
}


//exports
export type UserAuth = {
    email: UserEmail;
    Password: UserPassword;
}

export type UserSignUp = UserAuth & {
    name: UserName;
    ConfirmPassword: UserConfirmPassword;
}