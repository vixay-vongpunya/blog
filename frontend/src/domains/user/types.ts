export type UserId = string;
type UserName = string;
type UserEmail = string;
type UserPassword = string;
type UserConfirmPassword = string;

export type User = {
    id: string,
    name: string,
    displayName: string,
    bio: string | undefined,
    profileImage: string | undefined,
    backgroundImage: string | undefined,
}

export type Author = {
    id: string,
    name: string,
    displayName: string,
    bio: string | undefined,
    profileImage: string | undefined,
}

export type Account = User & {
    subscription: {
        followerCount: number,
        followingCount: number
    }
}

export type UpdateUser = {
    id: string,
    name: string,
    bio: string | undefined,
    profileImage: File | undefined,
    backgroundImage: File | undefined,
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