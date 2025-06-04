import { getRecentPosts} from "@/api/post"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"



//need to change this later
export const useGetAllPostsQuery = () => {
    return useQuery({   
        queryKey: ['all-posts'],
        queryFn:async()=>{
            const response = await getRecentPosts()
            return{
                pages: [response]
            }
        },
        gcTime: 1,

    })
}

export const useGetRecentPostsQuery = () => {
    return useQuery({   
        queryKey: ['all-posts'],
        queryFn:async()=>{
            const response = await getRecentPosts()
            console.log("b", response)
            return{
                pages: [response]
            }
        },
        gcTime: 1,

    })
}