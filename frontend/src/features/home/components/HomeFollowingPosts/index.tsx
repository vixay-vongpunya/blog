import { queryKey } from "@/components/post-list-hooks/post-card-hook"
import { useGetFeedFollowingPostsQuery } from "../../hooks/query"
import HomePosts from "../HomePosts"

const HomeFollowingPosts = ()=>{
    const { data: posts, hasNextPage, fetchNextPage } = useGetFeedFollowingPostsQuery()
    console.log("following posts", posts)
    if(!posts) return <>loading...</>
    
    return(
        <HomePosts posts={posts} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} queryKey={queryKey.followingPosts}/>
    )
}
export default HomeFollowingPosts