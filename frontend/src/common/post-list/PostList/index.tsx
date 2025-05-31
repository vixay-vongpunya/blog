import { Box } from "@mui/material";
import PostCard from "../PostCard";
import { usePostCard } from "@/common/hooks/post-card-hook";
import PostCardFooter from "@/common/PostCardFooter";
import { formatDate } from "@/utils/date-formating";
import { useMemo } from "react";
import { Post } from "@/domains/post/types";
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
                xs: '1fr',
                sm: 'repeat(2,1fr)',
                md:'repeat(3,1fr)'}, gap: '3.5em 2em'}}>
                {postList?.slice(0,12).map((post: Post)=>(
                    <PostCard
                        key={post.id} 
                        post={post}
                        onClickProfile={(event: React.MouseEvent<HTMLDivElement>) => onClickProfile(event, post.author)}
                        onClickPost={()=>onClickPost(post.id, post.title)}
                        cardFooter={
                        <PostCardFooter 
                            savedPost={post.savedPost}
                            categories={post.categories} 
                            onClickCategory={(event, category)=>onClickCategory(event, category)} 
                            onClickSave={(event)=>onClickSave(event, pageNumber, post.id, post.savedPost, queryKey)}/>}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default PostList;