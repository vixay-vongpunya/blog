import PostList from "@/common/post-list/PostList";
import { useInfiniteSearchPostsQuery } from "../../hooks/query";
import { PostSearch } from "@/domains/post/types";
import { queryKey } from "@/common/hooks/post-card-hook";
import { Button } from "@mui/material";

type InfiniteScrollDisplayProps = {
    query: string,
    page: number,
}

function InfiniteScrollDisplay({query, page}: InfiniteScrollDisplayProps){
    const d = {
            keyword: query,
            take: 12, 
            order: 'desc' as PostSearch['order']
        }
    // has next page is based on the backend returned 
    const {data, hasNextPage, fetchNextPage, isLoading}= useInfiniteSearchPostsQuery(d)
    console.log("nah", data)
    return(
        <>
            {data?.pages.map((post, index)=>(
                <PostList key={index} pageNumber={index} posts={post} queryKey={queryKey.InfiniteScrollPosts}/>
            ))}
            {hasNextPage && <Button onClick={()=>fetchNextPage()}>load more</Button>}
            
        </>
    )
}

export default InfiniteScrollDisplay;