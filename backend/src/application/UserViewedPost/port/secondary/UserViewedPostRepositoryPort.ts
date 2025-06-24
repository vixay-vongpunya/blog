import { IUserViewedPost } from "../../domain/IUserViewedPost";

export interface UserViewedPostRepositoryPort{
    create(data: IUserViewedPost): Promise<void>
    find(userId: string): Promise<{postId: string}[]>
}