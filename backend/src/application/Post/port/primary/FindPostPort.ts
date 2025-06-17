import { IPostSearch, IPostSearchToTalPage } from "../../domain/IPost"


export interface FindPostPort{
    findPost(postId: string): Promise<any | null>
    findPostsByAuthor(authorId: string, cursorId: string | undefined): Promise<any | null>
    findRecentPosts(userId: string): Promise<any | null>
    // findSearchTotalPages(data: IPostSearchToTalPage): Promise<number>
    // findByQuery(data: IPostSearch): Promise<any | null>
    findBySemanticQuery(query: string, userId: string): Promise<any | null>
    findAllPosts(userId: string): Promise<any | null>
    findByCategory(userId: string, categoryId: string, cursor: string): Promise<{posts: any[], subscriptionId: string}| null>
}