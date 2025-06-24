import { Box } from "@mui/material";
import PostCard from "../PostCard";
import { usePostCard } from "@/components/post-list-hooks/post-card-hook";
import { formatDate } from "@/utils/date-formating";
import { useMemo } from "react";
import { Post } from "@/domains/post/types";
import PostCardFooter from "@/components/PostCardFooter";
//postlist and postcard is always used together, calling hook at list level is more performant
type PostListProps = {
    pageNumber?: number,
    posts: Post[] | undefined,
    queryKey: readonly unknown[],
}

function PostList({pageNumber=0, posts, queryKey}: PostListProps){
    const {onClickPost, onClickProfile, onClickCategory, onClickSave} = usePostCard()

    console.log("here level", posts)
    const postList = useMemo(()=>
        posts?.map(post=>({...post, createdAt: formatDate(post.createdAt)}))
    ,[posts])
    
    return(
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '3em'}}>
            <Box sx={{display: 'grid', gridTemplateColumns: {
                sm:'repeat(2,1fr)',
                lg:'repeat(3,1fr)'}, gap: '3.5em 2em'}}>
                {postList?.slice(0,12).map((post: Post)=>(
                    <PostCard
                        key={post.id} 
                        post={post}
                        onClickProfile={(event: React.MouseEvent<HTMLDivElement>) => onClickProfile(event, post.author)}
                        onClickPost={()=>onClickPost(queryKey, pageNumber, post.id, post.title)}
                        cardFooter={
                        <PostCardFooter 
                            savedPost={post.savedPosts}
                            categories={post.categories} 
                            onClickCategory={(event, category)=>onClickCategory(event, category)} 
                            onClickSave={(event)=>onClickSave(event, pageNumber, post.id, post.savedPosts, queryKey)}/>}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default PostList;