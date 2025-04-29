
import { Box } from "@mui/material";
import HorizontalPostCard from "../HorizontalPostCard";
import { usePostCard } from "@/common/hooks/post-card-hook";
import PostCardFooter from "@/common/PostCardFooter";
import { useMemo } from "react";
import { formatDate } from "@/utils/date-formating";
import { Post } from "@/domains/post/types";

type HorizontalBlogCardProps = {
    posts: Post[]
}

function HorizontalPostList({posts}: HorizontalBlogCardProps){
    const {onClickPost, onClickProfile, onClickCategory, onClickSave} = usePostCard()
    const postList = useMemo(()=>
            posts.map(post=>({...post, createdAt: formatDate(post.createdAt)}))
        ,[posts])

    return(
        <Box sx={{
            display:'flex', 
            flexDirection:'column', 
            gap: 4}}>
                {postList.map((post:any)=>(
                    <HorizontalPostCard 
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
    )
}

export default HorizontalPostList;