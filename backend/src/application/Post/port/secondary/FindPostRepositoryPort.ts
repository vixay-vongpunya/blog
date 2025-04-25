

export interface FindPostRepositoryPort{
    findPostsByUserId(userId: string): Promise<any>
    findPost(postId: string): Promise<any>
    findPostsByCategory(categoryId: string): Promise<any>
}