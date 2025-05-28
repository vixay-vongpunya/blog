import { getPostsBySearch } from "@/api/post"
import { PostSearch } from "@/domains/post/types"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

export const useSearchPostsQuery = (data: PostSearch, isInfitniteScroll: boolean) =>{
    console.log(data, data.page)
    if (isInfitniteScroll){
        return useInfiniteQuery({
            queryKey: ['search', data.keyword],
            queryFn: async() => getPostsBySearch(data),
            initialPageParam: 0,
            getNextPageParam: (lastPage, pages) => lastPage.nextCursor,

        })
    }
    else{
        return useQuery({
            queryKey: ['search', data.keyword, data.page],
            queryFn: async()=>{
                return getPostsBySearch(data)
            },
            staleTime: 0,
            gcTime: 1,
        })
    }
}
