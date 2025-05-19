import { IPostSearch } from "../../domain/IPost"


export interface FindPostRepositoryPort{
    findPostsByUserId(userId: string): Promise<any>
    findPost(postId: string): Promise<any>
    findRecentPosts(userId: string): Promise<any | null>
    findByKeyword(data: IPostSearch): Promise<any>
    findAllPosts(usreId: string): Promise<any>
    findByCategory(userId: string, categoryId: string): Promise<any>
}