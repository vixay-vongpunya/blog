import { IPostsByAuthors } from "../../domain/IPost"


export interface FindPostRepositoryPort{
    findPost(userId: string, postId: string): Promise<any>
    findPostsByAuthor(authorId: string, cursor: string | undefined): Promise<any>
    findPostsByAuthors(data: IPostsByAuthors): Promise<any>
    findPostPreview(postId: string, userId: string): Promise<any>
    findRecentPosts(userId: string): Promise<any | null>
    // findSearchTotalPages(data: IPostSearchToTalPage): Promise<number>
    // findByQuery(data: IPostSearch): Promise<any>
    findFeedPosts(usreId: string): Promise<any>
    findAuthorsByCategory(categoryId: string, cursor: string): Promise<any>
    findByCategory(userId: string, categoryId: string, cursor: string | undefined): Promise<any>
}