import { PostSearch} from "@/domains/post/types"
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"
import {  deleteSearchHistory, getPostsBySearchToTalPages, getPostsBySemanticSearch, getSearchHistory } from "./fetcher"
import { getQueryClient } from "@/utils/query-client"
import { SearchHistory } from "@/domains/user/types"

const queryClient = getQueryClient()

//queryFn expects function not result
export const useSearchHistoryQuery = () => {
    return useQuery({
        queryKey:['search-history'],
        queryFn: () => getSearchHistory()
    })
}

export const useSearchHistoryMutation = () => {
    return useMutation({
        mutationFn: (id: string) => deleteSearchHistory(id),
        onSuccess:(_, id) => {
            queryClient.setQueryData(['search-history'],
                (prev: SearchHistory[])=>{
                    console.log(id, prev)
                    if(!prev) return prev
                    return prev.filter(item => item.id !== id)
                }
            )
        }
    })
}


export const useSearchPostsTotalPagesQuery = (data: {
    query: string,
    take: number,
}) =>{
    return useQuery({
        queryKey: ['search-total-pages', data.query],
        queryFn: () => getPostsBySearchToTalPages(data.query, data.take)
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
        queryKey: ['search', data.query, data.page],
        queryFn: async()=>{
            const response  = await getPostsBySemanticSearch(data.query, data.page, data.take)
            return {
                pages: [response]
            }
        }
    })    
}

// i dont use useInfiniteQuery here due to how react Query store this data as pages, which will have conflict with 
// data returned from api is directly cached
// so getNextPageParam can only get the last called api, so need to keep cursor within each page
export const useInfiniteSearchPostsQuery = (query: string, take: number = 12) =>{
    return useInfiniteQuery({
        queryKey: ['infinite-posts', query],
        queryFn: ({pageParam}: {pageParam: number})=>
            // make it always page 1 to account for first request when cursor is null
            // getPostsBySearch({...data, cursor: pageParam, page: 1})
            getPostsBySemanticSearch(query, pageParam, take)
        ,            
        initialPageParam: 1,
        //need condition for stopping
        getNextPageParam: (lastPage, pages) => lastPage.length < take ? pages.length + 1 : undefined
    })    
}