
import { SearchHistoryPort } from "@root/src/application/SearchHistory/port/primary/SearchHistory";
import { inject, injectable } from "tsyringe";

@injectable()
export class SearchHistoryController{
    constructor(@inject("SearchHistoryUsecase") private searchHistoryUsecase: SearchHistoryPort){
        
    }
    
    async delete(id: string){
        await this.searchHistoryUsecase.delete(id)
    }
    
}