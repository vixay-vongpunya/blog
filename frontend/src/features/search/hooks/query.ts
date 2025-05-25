import { getPostsBySearch } from "@/api/post"
import { PostSearch } from "@/domains/post/types"
import { useQuery } from "@tanstack/react-query"


export const useSearchPostsQuery = (data: PostSearch, page: number) =>{
    return useQuery({
        queryKey: ['search', data.keyword, page],
        queryFn: async()=>{
            return getPostsBySearch(data)
        }
    })
}