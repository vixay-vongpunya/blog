import { ISearchHistoryToUI } from "../../domain/ISearchHistory";

export interface FindSearchHistoryRepositoryPort{
    findByUser(userId: string): Promise<ISearchHistoryToUI[]>
}