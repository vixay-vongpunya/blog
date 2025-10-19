import { useGetFeedPostsQuery } from "../../hooks/query"
import HomePosts from "../HomePosts"
import { queryKey } from "@/components/post-list-hooks/post-card-hook"

const HomeFeedPosts = ()=>{
    const { data: posts, hasNextPage, fetchNextPage } = useGetFeedPostsQuery()
    console.log("feed", posts)
    if(!posts) return <>loading...</>
    return(
        <HomePosts posts={posts} hasNextPage={hasNextPage} fetchNextPage={()=>fetchNextPage()} queryKey={queryKey.feedPosts}/>
    )
}

export default HomeFeedPosts