import { CategoryId } from "@/domains/category/types"
import { Post } from "@/domains/post/types"
import { AuthorCard } from "@/domains/user/types"
import { server } from "@/utils/axios"

type GetCategorySeachDetail = {
    subscription: {
        id: string | null
    },
    followerCount: number
}
export const getCategorySeachDetail = async(categoryId: CategoryId):Promise<GetCategorySeachDetail> => {
    try{
        const response = await server.get(`/categories/${categoryId}/subscriptions/detail`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const getPostsByCategory = async(categoryId: CategoryId, cursor: string | null): Promise<Post[]> => {
    try{
        const response = await server.get(`/categories/${categoryId}/posts/search?cursor=${cursor}`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const getAuthorsByCategory = async(categoryId: string, cursor: string | null):Promise<AuthorCard[]> => {
    try{
        const response = await server.get(`/categories/${categoryId}/users/search?&cursor=${cursor}`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export const categorySubscription = async(categoryId: CategoryId) => {
    try{
        const response = await server.post('/users/categories/subscriptions', {categoryId: categoryId})
        // better to check the id
        return {categoryId: categoryId, subscriptionId: response.data.id}
    }
    catch(error){
        throw error
    }
}

export const deleteCategorySubscription = async(subscriptionId: string) => {
    try{
        const response = await server.delete(`/users/categories/subscriptions/${subscriptionId}`)
        // better to check the id
        return response.data
    }
    catch(error){
        throw error
    }
}