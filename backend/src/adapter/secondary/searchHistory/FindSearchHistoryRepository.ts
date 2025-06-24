import { PrismaClient } from ".prisma/client";
import db from "@infrastructure/db/db"
import { FindSearchHistoryRepositoryPort } from "@root/src/application/SearchHistory/port/secondary/FindSearchHistoryRepositoryPort";

export class FindSearchHistoryRepository implements FindSearchHistoryRepositoryPort{
    private db: PrismaClient
    private model: typeof this.db.searchHistory
    constructor(){
        this.model = db.searchHistory
    }
    
    async findByUser(userId: string){
        const queries = await this.model.findMany({
            where: {userId: userId},
            select:{
                id: true,
                query: true
            },
            take: 10
        })

        return queries
    }
}