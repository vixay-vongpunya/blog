import { FindSearchHistoryPort } from "@root/src/application/SearchHistory/port/primary/FindSearchHistoryPort";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindSearchHistoryController{
    constructor(@inject("FindSearchHistoryUsecase") private findSearchHistoryUsecase: FindSearchHistoryPort){
        
    }

    async findByUser(userId: string){
        const queries = await this.findSearchHistoryUsecase.findByUser(userId)
        return queries
    }
}