import { IPostSearch } from "../../domain/IPost"


export interface FindPostRepositoryPort{
    findPostsByUserId(userId: string): Promise<any>
    findPost(postId: string): Promise<any>
    findByKeyword(data: IPostSearch): Promise<any>
    findAllPosts(): Promise<any>
    findByCategory(categoryId: string): Promise<any>
}