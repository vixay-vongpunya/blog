import { IVectorFeedData, IVectorSearchData, IVectorTotalPageSearchData } from "@root/src/application/VectorStoreService/types/IVectorStore"
import { IPostCommonSearch, IPostsByAuthors, IPostsByAuthorsToDomain } from "../../domain/IPost"


export interface FindPostPort{
    findPost(userId: string, postId: string): Promise<any | null>
    findPopularPosts(data: IPostCommonSearch): Promise<any>
    findPostsByAuthor(authorId: string, cursorId: string | undefined): Promise<any | null>
    findFollowingPosts(data: IPostsByAuthorsToDomain): Promise<any | null>
    findSearchTotalPages(data: IVectorTotalPageSearchData): Promise<number>
    // findByQuery(data: IPostSearch): Promise<any | null>
    findBySemanticQuery(data: IVectorSearchData): Promise<any | null>
    findFeedPosts(data: IVectorFeedData): Promise<any | null>
    findByCategory(userId: string, categoryId: string, cursor: string | undefined): Promise<{posts: any[], subscriptionId: string}| null>
}