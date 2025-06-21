import { getRecentPosts} from "@/api/post"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { getFeedPosts } from "./fetcher"



//need to change this later
export const useGetFeedPostsQuery = (take: number = 12) =>{
    return useInfiniteQuery({
        queryKey: ['feed-posts'],
        queryFn: ({pageParam}: {pageParam: number})=>
            // make it always page 1 to account for first request when cursor is null
            // getPostsBySearch({...data, cursor: pageParam, page: 1})
            getFeedPosts(pageParam, take)
        ,            
        initialPageParam: 1,
        //need condition for stopping
        getNextPageParam: (lastPage, pages) => lastPage.length < take ? pages.length + 1 : undefined
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