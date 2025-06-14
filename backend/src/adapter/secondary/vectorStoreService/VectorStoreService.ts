import { UnCaughtError } from "@root/src/Errors/UnCaught";

export class VectorStoreService{
    async store(data: any){
        try{
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
            const response = await fetch(process.env.EMBEDDING_SERVICE_URL+`/search?query=${query}&page_size=${10}`)
            console.log("query result", response)
        }
        catch(error){
            throw new UnCaughtError(error)
        }
    }
}