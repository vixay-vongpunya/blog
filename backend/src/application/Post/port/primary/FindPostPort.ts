import { IPostSearch } from "../../domain/IPost"


export interface FindPostPort{
    findPostsByUserId(userId: string):Promise<any | null>
    findPost(postId: string): Promise<any | null>
    findByKeyword(data: IPostSearch): Promise<any | null>
    findAllPosts(): Promise<any | null>
    findPostsByCategory(categoryId: string): Promise<any | null>
}