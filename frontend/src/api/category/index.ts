import { server } from "@/utils/axios"

export type Category = {
    id: string;
    name: string;
}

export const fetchCategory = async()=>{
    try{
        const response = await server.get('/category')
        return response.data
    }
    catch(error){
        throw error
    }
}