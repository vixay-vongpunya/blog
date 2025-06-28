
import { Box } from "@mui/material";
import HorizontalPostCard from "../HorizontalPostCard";
import { usePostCard } from "@/components/post-list-hooks/post-card-hook";
import { useMemo } from "react";
import { formatDate } from "@/utils/date-formating";
import { Post } from "@/domains/post/types";
import PostCardFooter from "@/components/PostCardFooter";

type HorizontalBlogCardProps = {
    pageNumber?: number,
    posts: Post[] | undefined;
    isProfile: boolean | undefined;
    queryKey: readonly unknown[];
}

function HorizontalPostList({pageNumber=0, posts, isProfile=false, queryKey}: HorizontalBlogCardProps){
    const {onClickPost, onClickProfile, onClickCategory, onClickSave} = usePostCard()
    const postList = useMemo(()=>
            posts?.map(post=>({...post, createdAt: formatDate(post.createdAt)}))
        ,[posts])

    return(
        <Box sx={{
            display:'flex', 
            flexDirection:'column', 
            gap: "2em"}}>
                {postList?.map((post: any)=>(
                    <HorizontalPostCard 
                        key={post.id} 
                        post={post}
                        isProfile={isProfile}
                        categories={post.categories} 
                        onClickCategory={(event, category)=>onClickCategory(event, category)} 
                        onClickProfile={(event: React.MouseEvent<HTMLSpanElement>)=>onClickProfile(event, post.author)}
                        onClickPost={()=>onClickPost(queryKey, pageNumber, post.id, post.title)}
                        cardFooter={
                        <PostCardFooter 
                            views={post.views}
                            savedPost={post.savedPosts}
                            
                            onClickSave={(event)=>onClickSave(event, pageNumber, post.id, post.savedPosts, queryKey)}/>}
                    />
                ))}
        </Box>
    )
}

export default HorizontalPostList;