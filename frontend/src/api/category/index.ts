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

type GetCategorySeachDetail = {
    subscription: {
        id: string | null
    },
    followerCount: number
}
export const getCategorySeachDetail = async(categoryId: string):Promise<GetCategorySeachDetail> => {
    try{
        const response = await server.get(`/categories/${categoryId}/subscriptions/detail`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const getAuthorsByCategory = async(categoryId: string, cursor: string | null):Promise<AuthorCard[]> => {
    try{
        const response = await server.get(`/categories/${categoryId}/users/search?&cursor=${cursor}`)
        console.log("be", response.data)
        return response.data
    }
    catch(error){
        throw error
    }
}