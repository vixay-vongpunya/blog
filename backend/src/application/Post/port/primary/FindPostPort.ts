

export interface FindPostPort{
    findPostsByUserId(userId: string):Promise<any | null>
    findPost(postId: string): Promise<any | null>
    findPostsByCategory(categoryId: string): Promise<any | null>
}