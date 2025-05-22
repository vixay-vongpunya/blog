
import { getMyPosts, getAccount } from "@/api/user"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetAccount = (userId: string) => {
    return useQuery({
        queryKey:['account', userId],
        queryFn: async()=>{
            return getAccount(userId)
        },
        enabled: true,
    })
}


export const useGetMyPostsQuery = () => {    
    return useQuery({
        queryKey: ['fetchPost'],
        queryFn: async()=>{
            return getMyPosts()
        }
    })
}

export const useAccountUpdateMutation = () => {
    return useMutation({
        mutationKey: [''],
        mutationFn: async(data: FormData)=>{
            return {}
        }
    })
}