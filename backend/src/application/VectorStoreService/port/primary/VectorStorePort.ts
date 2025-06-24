
export interface VectorStorePort {
    findRelatedPosts(userId: string, postId: string): Promise<any>
}