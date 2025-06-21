import PostList from "@/common/post-list/PostList";
import { useInfiniteSearchPostsQuery } from "../../hooks/query";
import { PostSearch } from "@/domains/post/types";
import { queryKey } from "@/common/hooks/post-card-hook";
import { Button, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { useInfinitPostlistObserver } from "@/utils/hooks/post/InfinitePostlistObserver";

type InfiniteScrollDisplayProps = {
    query: string,
    page: number,
}

function InfiniteScrollDisplay({query, page}: InfiniteScrollDisplayProps){
    const loadMoreRef = useRef(null)
    const d = {
            query: query,
            page: page,
            take: 10
        }
    // has next page is based on the backend returned 
    const {data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading}= useInfiniteSearchPostsQuery(d)
    console.log("nah", data, hasNextPage, isFetchingNextPage)

    useEffect(()=>{
        if(!loadMoreRef.current || !hasNextPage) return
        const {observer, cleanup} = useInfinitPostlistObserver(fetchNextPage)
        observer.observe(loadMoreRef.current)

        return cleanup
    },[hasNextPage, fetchNextPage, loadMoreRef])

    return(
        <>
            {data?.pages.map((page, index)=>(
                <PostList key={index} pageNumber={index} posts={page} queryKey={queryKey.InfiniteScrollPosts}/>
            ))}
            {hasNextPage && <div ref={loadMoreRef}></div>}
            {isFetchingNextPage && <Typography>loading</Typography>}
        </>
    )
}

export default InfiniteScrollDisplay;