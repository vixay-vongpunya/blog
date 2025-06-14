import { inject } from "tsyringe";
import { VectorStoreServicePort } from "../port/secondary/VectorStoreServicePort";
import { UnCaughtError } from "@root/src/Errors/UnCaught";


export class VectorStoreUsecase {
    constructor(@inject("VectorStoreService") private vectorStoreService: VectorStoreServicePort){
    }

    async find(query: string){
        try{
            const data = await this.vectorStoreService.find(query)
            console.log(data)
            return data
        }
        catch(error){
            throw new UnCaughtError(error)
        }
    }
}