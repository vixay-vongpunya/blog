
import { getMyPosts } from "@/api/user"
import { useMutation, useQuery } from "@tanstack/react-query"


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