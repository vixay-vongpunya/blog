export type UserId = string;
type UserName = string;
type UserEmail = string;
type UserPassword = string;
type UserConfirmPassword = string;
type UserCreatedAt = Date;

export type User = {
    id: string,
    name: string,
    imagePath: string,
    bio?: string,
}


//exports
export type UserAuth = {
    email: UserEmail;
    password: UserPassword;
}

export type UserSignUp = UserAuth & {
    name: UserName;
    ConfirmPassword: UserConfirmPassword;
}

export type AuthorCard = User & {
    followerCount: number;
    subscription: {
        id: string
    }
}