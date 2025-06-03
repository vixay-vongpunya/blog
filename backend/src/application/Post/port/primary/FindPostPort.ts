import { IPostSearch, IPostSearchToTalPage } from "../../domain/IPost"


export interface FindPostPort{
    findPostsByAuthor(authorId: string, cursorId: string | undefined):Promise<any | null>
    findPost(postId: string): Promise<any | null>
    findRecentPosts(userId: string): Promise<any | null>
    findSearchTotalPages(data: IPostSearchToTalPage): Promise<number>
    findByKeyword(data: IPostSearch): Promise<any | null>
    findAllPosts(userId: string): Promise<any | null>
    findByCategory(userId: string, categoryId: string, cursor: string): Promise<{posts: any[], subscriptionId: string}| null>
}