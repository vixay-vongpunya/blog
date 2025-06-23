import { queryKey } from "@/components/post-list-hooks/post-card-hook"
import HorizontalPostList from "@/components/horizonal-post-list/HorizontalPostList"
import PostList from "@/components/post-list/PostList"
import { Post } from "@/domains/post/types"
import { useMatchMedia } from "@/utils/useMatchMedia"

type PostListBasedCardProps = {
    posts: Post[],
    pageNumber: number, 
    queryKey: readonly unknown[];
}

function PostListBasedCard({posts, pageNumber, queryKey}: PostListBasedCardProps){
    const matchMedia = useMatchMedia()
    return(
        matchMedia === "mobile" ?
        <HorizontalPostList isProfile={false} pageNumber={pageNumber} posts={posts} queryKey={queryKey}/> : 
        <PostList posts={posts} queryKey={queryKey}/>
    )
}

export default PostListBasedCard