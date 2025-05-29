import { getPostsBySearch } from "@/api/post"
import { PostSearch } from "@/domains/post/types"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

//after reading thru docs
//useInfiniteQuery is best for infiniteScroll, not support page jumping unless i query all pages
//i aim to use the same endpoint for both offset and cursor so useQuery works better.
//caching is different for both cases, so better to make seperate function

//pagination query: offset(for page jump) + cursor for previous and next page
// this use the same query 
export const useSearchPostsQuery = (data: PostSearch) =>{
    return useQuery({
        queryKey: ['search', data.keyword, data.page],
        queryFn: async()=>{
            return getPostsBySearch(data)
        },
        select: (data) => ({
            pages: data
        }),
        staleTime: 0,
        gcTime: 1,
    })    
}

// i dont use useInfiniteQuery here due to how react Query store this data as pages, which will have conflict with 
export const useInfiniteSearchPostsQuery = (data: {keyword: string, take: number, order: PostSearch['order']}) =>{
    return useInfiniteQuery({
        queryKey: ['infinite-posts'],
        queryFn: async({pageParam}: {pageParam: string | null})=>{
            return getPostsBySearch({...data, cursor: pageParam, page: null})
        },
        initialPageParam: null,
        getNextPageParam: (lastPage, pages) => lastPage[lastPage.length-1].id,
    })    
}