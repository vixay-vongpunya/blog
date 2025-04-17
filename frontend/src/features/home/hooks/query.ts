import { useQuery } from "@tanstack/react-query"
import { fetchBlogs } from "./fetcher"

export const usePostsQuery = ()=>{
    return useQuery({
        queryKey:['posts'],
        queryFn: async () => {
            return await fetchBlogs()
        }
    })
}