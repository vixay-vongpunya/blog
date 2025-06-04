import { Category } from "@/domains/category/types"
import { AuthorCard } from "@/domains/user/types"
import { server } from "@/utils/axios"

export const fetchCategory = async():Promise<Category[]> => {
    try{
        const response = await server.get('/categories')
        return response.data
    }
    catch(error){
        throw error
    }
}




