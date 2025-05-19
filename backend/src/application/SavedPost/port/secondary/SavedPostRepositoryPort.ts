

export interface SavedPostRepositoryPort {
    create(userId: string, postId: string): Promise<any>
    delete(userId: string, id: string): Promise<any>
}