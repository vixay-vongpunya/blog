import { IPostSearch } from "../../domain/IPost"


export interface FindPostPort{
    findPostsByUserId(userId: string):Promise<any | null>
    findPost(postId: string): Promise<any | null>
    findRecentPosts(userId: string): Promise<any | null>
    findByKeyword(data: IPostSearch): Promise<any | null>
    findAllPosts(userId: string): Promise<any | null>
    findByCategory(userId: string, categoryId: string): Promise<{posts: any[], subscriptionId: string}| null>
}