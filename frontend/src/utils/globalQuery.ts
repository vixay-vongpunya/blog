import { fetchCategory } from "@/api/category"
import { getSelfSubscription, userSubscription } from "@/api/user"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useGetCategoryQuery = ()=>{
    return useQuery({
        queryKey: ['get-category'],
        queryFn: async()=>{
            return fetchCategory()
        }
    })  
}

export const useGetSelfSubscription = () =>{
    return useQuery({
        queryKey: ['get-subscription'],
        queryFn: async()=>{
            return await getSelfSubscription()
        }
    })
}

