
export interface SearchHistoryPort{
    delete(id: string): Promise<void>
}