import { IVectorStoreCreateData, IVectorStoreUserVectorUpdateData } from "../../types/IVectorStore";


export interface VectorStoreServicePort{
    store(data: IVectorStoreCreateData): Promise<any>;
    find(query: string): Promise<string[]>;
    findRelatedPosts(postId: string): Promise<any>;
    findUserFeed(userId: string): Promise<any>;
    updateUserVector(data: IVectorStoreUserVectorUpdateData): Promise<string[]>;
}