import { fetchMyPost, fetchPosts } from "@/api/post"
import { useQuery } from "@tanstack/react-query"

export const usePostsQuery = () => {
    return useQuery({   
        queryKey: ['posts'],
        queryFn:async()=>{
            return fetchPosts()
        },

    })
}