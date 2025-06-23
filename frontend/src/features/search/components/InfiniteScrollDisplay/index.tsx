import PostList from "@/components/post-list/PostList";
import { useInfiniteSearchPostsQuery } from "../../hooks/query";
import { queryKey } from "@/components/post-list-hooks/post-card-hook";
import { Button, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { useInfinitPostlistObserver } from "@/utils/hooks/post/InfinitePostlistObserver";
import PostListBasedCard from "@/components/PostListBasedCard";

type InfiniteScrollDisplayProps = {
    query: string,
}

function InfiniteScrollDisplay({query}: InfiniteScrollDisplayProps){
    const loadMoreRef = useRef(null)
    // has next page is based on the backend returned 
    const {data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading}= useInfiniteSearchPostsQuery(query)

    useEffect(()=>{
        if(!loadMoreRef.current || !hasNextPage) return
        const {observer, cleanup} = useInfinitPostlistObserver(fetchNextPage)
        observer.observe(loadMoreRef.current)

        return cleanup
    },[hasNextPage, fetchNextPage, loadMoreRef])

    return(
        <>
            {data?.pages.map((page, index)=>(
                <PostListBasedCard key={index} pageNumber={index} posts={page} queryKey={queryKey.InfiniteScrollPosts}/>
            ))}
            {hasNextPage && <div ref={loadMoreRef}/>}
            {isFetchingNextPage && <Typography>loading</Typography>}
        </>
    )
}

export default InfiniteScrollDisplay;