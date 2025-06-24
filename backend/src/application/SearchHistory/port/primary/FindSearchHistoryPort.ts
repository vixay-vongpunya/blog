import { ISearchHistoryToUI } from "../../domain/ISearchHistory";

export interface FindSearchHistoryPort{
    findByUser(userId: string): Promise<ISearchHistoryToUI>
}