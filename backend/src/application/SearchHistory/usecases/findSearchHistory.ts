import { inject, injectable } from "tsyringe";
import { FindSearchHistoryPort} from "../port/primary/FindSearchHistoryPort";
import { FindSearchHistoryRepositoryPort } from "../port/secondary/FindSearchHistoryRepositoryPort";

@injectable()
export class FindSearchHistoryUsecase implements FindSearchHistoryPort{
    constructor(@inject("FindSearchHistoryRepository") private findSearchHistory: FindSearchHistoryRepositoryPort){}
    async findByUser(userId: string): Promise<any> {
        const queries = this.findSearchHistory.findByUser(userId)
        return queries
    }
}