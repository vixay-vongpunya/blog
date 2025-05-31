import PostList from "@/common/post-list/PostList";
import { useInfiniteSearchPostsQuery } from "../../hooks/query";
import { PostSearch } from "@/domains/post/types";
import { queryKey } from "@/common/hooks/post-card-hook";
import { Button, Typography } from "@mui/material";
import { useEffect, useRef } from "react";

type InfiniteScrollDisplayProps = {
    query: string,
    page: number,
}

function InfiniteScrollDisplay({query, page}: InfiniteScrollDisplayProps){
    const loadMoreRef = useRef(null)
    const d = {
            keyword: query,
            take: 12, 
            order: 'desc' as PostSearch['order']
        }
    // has next page is based on the backend returned 
    const {data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading}= useInfiniteSearchPostsQuery(d)
    console.log("nah", data, hasNextPage, isFetchingNextPage)

    useEffect(()=>{
        if(!loadMoreRef.current || !hasNextPage) return
        const observer = new IntersectionObserver(
            (entries)=>{
                entries.forEach(entry=>{
                    if(entry.isIntersecting){
                        console.log("intersected")
                        fetchNextPage()
                    }
                })
            },{
                rootMargin: '0px 0px 50% 0px',
                threshold: 0.1
            }
        )
        
        observer.observe(loadMoreRef.current)

        return()=>{
            observer.disconnect()
        }
    },[hasNextPage, fetchNextPage, loadMoreRef])

    return(
        <>
            {data?.pages.map((post, index)=>(
                <PostList key={index} pageNumber={index} posts={post} queryKey={queryKey.InfiniteScrollPosts}/>
            ))}
            {hasNextPage && <div ref={loadMoreRef}></div>}
            {isFetchingNextPage && <Typography>loading</Typography>}
        </>
    )
}

export default InfiniteScrollDisplay;