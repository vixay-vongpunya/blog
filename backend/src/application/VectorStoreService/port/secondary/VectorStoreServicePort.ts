import { IVectorStoreCreateData } from "../../types/IVectorStore";


export interface VectorStoreServicePort{
    store(data: IVectorStoreCreateData): Promise<any>;
    find(query: string): Promise<any>
}