import { IVectorStoreCreateData } from "@root/src/application/VectorStoreService/types/IVectorStore";
import { UnCaughtError } from "@root/src/Errors/UnCaught";

export class VectorStoreService{
    async store(data: IVectorStoreCreateData){
        try{
            console.log("arrived to service", data)
            const response = await fetch(process.env.EMBEDDING_SERVICE_URL+"/store", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })

            console.log("stored", response)
        }
        catch(error){
            throw new UnCaughtError(error)
        }
    }

    async find(query: string){
        try{
            const response = await fetch(process.env.EMBEDDING_SERVICE_URL+`/semantic_search?query=${query}&page_size=${10}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            return response.json()
        }
        catch(error){
            throw new UnCaughtError(error)
        }
    }
}