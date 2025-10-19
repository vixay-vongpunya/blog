import HorizontalPostList from "@/components/horizonal-post-list/HorizontalPostList"
import { Post } from "@/domains/post/types"
import { useInfinitPostlistObserver } from "@/utils/hooks/post/InfinitePostlistObserver"
import { Box } from "@mui/material"
import { ForwardedRef, forwardRef, useEffect, useRef } from "react"

type HomePostsProps = {
    posts: {
        pages: Post[][]
    };
    hasNextPage: boolean;
    fetchNextPage: () => void;
    queryKey: readonly unknown[]
}

function HomePosts ({ posts, hasNextPage, fetchNextPage, queryKey}: HomePostsProps) {
    const loadMoreRef = useRef<HTMLDivElement | null>(null)

    useEffect(()=>{
        if(!hasNextPage || !loadMoreRef.current) return
        const {observer, cleanup} = useInfinitPostlistObserver(fetchNextPage)
        observer.observe(loadMoreRef.current)
        return cleanup

    },[hasNextPage, fetchNextPage, loadMoreRef])
    console.log("home posts",posts)
    return(
        <Box sx={{ display:"flex", flexDirection:"column", gap: 3}}>
            {posts?.pages.map((page, index)=>
                <HorizontalPostList key={index} posts={page} queryKey={queryKey} isProfile={false}/>
            )}
            {
                hasNextPage && <div ref={loadMoreRef}/>
            }
        </Box>
    )
}

export default HomePosts