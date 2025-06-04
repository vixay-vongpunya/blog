
import { PostSearch, PostSearchTotalPages } from "@/domains/post/types"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { getPostsBySearch, getPostsBySearchToTalPages } from "./fetcher"


export const useSearchPostsTotalPagesQuery = (data: PostSearchTotalPages) =>{
    return useQuery({
        queryKey: ['search-total-pages', data.keyword],
        queryFn: async()=>getPostsBySearchToTalPages(data)
    })    
}

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
            const response  = await getPostsBySearch(data)
            return {
                pages: [response]
            }
        }
    })    
}

// i dont use useInfiniteQuery here due to how react Query store this data as pages, which will have conflict with 
// data returned from api is directly cached
// so getNextPageParam can only get the last called api, so need to keep cursor within each page
export const useInfiniteSearchPostsQuery = (data: {keyword: string, take: number, order: PostSearch['order']}) =>{
    return useInfiniteQuery({
        queryKey: ['infinite-posts'],
        queryFn: ({pageParam}: {pageParam: string | null})=>
            // make it always page 1 to account for first request when cursor is null
            getPostsBySearch({...data, cursor: pageParam, page: 1})
        ,            
        initialPageParam: null,
        getNextPageParam: (lastPage, pages) => lastPage.length === 12 ? lastPage[lastPage.length-1].id : null
    })    
}