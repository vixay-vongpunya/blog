import { PrismaClient } from ".prisma/client";
import db from "@infrastructure/db/db"
import { ISearchHistoryCreate } from "@root/src/application/SearchHistory/domain/ISearchHistory";

export class SearchHistoryRepository{
    private db: PrismaClient
    private model: typeof this.db.searchHistory
    constructor(){
        this.model = db.searchHistory
    }
    
    async create(data: ISearchHistoryCreate){
        await this.model.create({
            data: {
                userId: data.userId,
                query: data.query,
            }
        })
    }

    async delete(id: string){
        await this.model.delete({
            where:{id: id}
        })
    }
}