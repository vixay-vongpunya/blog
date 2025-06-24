import { ISearchHistoryCreate } from "../../domain/ISearchHistory";

export interface SearchHistoryRepositoryPort{
    create(data: ISearchHistoryCreate): Promise<void>
    delete(id: string): Promise<void>
}