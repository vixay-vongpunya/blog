import { fetchCategory } from "@/api/category"
import { getSelf, getSelfSubscription, userSubscription } from "@/api/user"
import { UserId } from "@/domains/user/types"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useGetSelf = () => {
    return useQuery({
        queryKey:['get-self'],
        queryFn: async()=>{
            return getSelf()
        },
        enabled: true,
    })
}

export const useGetCategoryQuery = ()=>{
    return useQuery({
        queryKey: ['get-category'],
        queryFn: async()=>{
            return fetchCategory()
        },
        staleTime: Infinity,
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

export const useUserSubscription = () =>{
    return useMutation({
        mutationKey: ['user-subscription'],
        mutationFn: async(authorId: UserId)=>{
            return await userSubscription(authorId)
        }
    })
}


