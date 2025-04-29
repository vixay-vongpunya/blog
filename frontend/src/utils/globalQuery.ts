import { fetchCategory } from "@/api/category"
import { userSubscription } from "@/api/user"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useGetCategoryQuery = ()=>{
    return useQuery({
        queryKey: ['getCategory'],
        queryFn: async()=>{
            return fetchCategory()
        }
    })  
}

export const useUserSubscription = () =>{
    return useMutation({
        mutationFn: async(authorId: string)=>{
            return await userSubscription(authorId)
        }
    })
}

export const useCategorySubscription = () =>{
    return useMutation({
        mutationFn: async(categoryId: string)=>{
            return await userSubscription(categoryId)
        }
    })
}