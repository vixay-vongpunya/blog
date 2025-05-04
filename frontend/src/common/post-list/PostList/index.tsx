import { Box, Button, Pagination } from "@mui/material";
import PostCard from "../PostCard";
import { usePostCard } from "@/common/hooks/post-card-hook";
import PostCardFooter from "@/common/PostCardFooter";
import { formatDate } from "@/utils/date-formating";
import { useMemo } from "react";
import { Post } from "@/domains/post/types";
import RoundButton from "@/components/RoundButton";

type PostListProps = {
    posts: Post[] | undefined
}

function PostList({posts}: PostListProps){
    const {onClickPost, onClickProfile, onClickCategory, onClickSave} = usePostCard()

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
                        onClickProfile={(event: React.MouseEvent<HTMLDivElement>)=>onClickProfile(event, post.author)}
                        onClickPost={()=>onClickPost(post.id, post.title)}
                        cardFooter={
                        <PostCardFooter 
                            categories={post.categories} 
                            onClickCategory={(event, category)=>onClickCategory(event, category)} 
                            onClickSave={(event)=>onClickSave(event, post.id)}/>}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default PostList;