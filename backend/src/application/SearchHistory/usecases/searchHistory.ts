import { inject, injectable } from "tsyringe";
import { SearchHistoryPort } from "../port/primary/SearchHistory";
import { SearchHistoryRepositoryPort } from "../port/secondary/SearchHistoryRepositoryPort";

@injectable()
export class SearchHistoryUsecase implements SearchHistoryPort{
    constructor(@inject("SearchHistoryRepository") private searchHistoryRepository: SearchHistoryRepositoryPort){}
    async delete(id: string) {
        await this.searchHistoryRepository.delete(id)
    }
}