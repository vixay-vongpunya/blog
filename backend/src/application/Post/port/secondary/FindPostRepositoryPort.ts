import { IPostSearch, IPostSearchToTalPage } from "../../domain/IPost"


export interface FindPostRepositoryPort{
    findPost(postId: string): Promise<any>
    findPostsByAuthor(authorId: string, cursor: string | undefined): Promise<any>
    findPostPreview(postId: string, userId: string): Promise<any>
    findRecentPosts(userId: string): Promise<any | null>
    // findSearchTotalPages(data: IPostSearchToTalPage): Promise<number>
    // findByQuery(data: IPostSearch): Promise<any>
    findAllPosts(usreId: string): Promise<any>
    findAuthorsByCategory(categoryId: string, cursor: string): Promise<any>
    findByCategory(userId: string, categoryId: string, cursor: string): Promise<any>
}