import { getPostsByCategory } from "@/api/post"
import { categorySubscription } from "@/api/user"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useGetPostsByCategory = (categoryId: string) =>{
    return useQuery({
        queryKey: ['posts-by-category', {categoryId}],
        queryFn: async()=>{
            return getPostsByCategory(categoryId)
        }
    })
}

export const useCreateCategorySubscription = () =>{
    return useMutation({
        mutationKey: ['self-subscription'],
        mutationFn: async(categoryId: string)=>{
            return categorySubscription(categoryId)
        }
    })
}