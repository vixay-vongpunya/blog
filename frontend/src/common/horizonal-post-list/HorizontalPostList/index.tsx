import { Post } from "@/api/post";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import { useQueryParams } from "@/providers/QueryParamsProvider";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import HorizontalPostCard from "../HorizontalPostCard";
import { usePostCard } from "@/common/hooks/post-card-hook";
import PostCardFooter from "@/common/PostCardFooter";
import { useMemo } from "react";
import { formatDate } from "@/utils/date-formating";

type HorizontalBlogCardProps = {
    posts: Post[]
}

function HorizontalPostList({posts}: HorizontalBlogCardProps){
    const {onClickPost, onClickProfile, onClickCategory, onClickSave} = usePostCard()
    const postList = useMemo(()=>
            posts.map(post=>({...post, created: formatDate(post.created)}))
        ,[posts])

    return(
        <Box sx={{
            display:'flex', 
            flexDirection:'column', 
            gap: 4}}>
                {postList.map((post:any)=>(
                    <HorizontalPostCard 
                        key={post.id} 
                        id={post.id} 
                        title={post.title} 
                        preview={post.preview} 
                        created={post.created}
                        author={post.author.name}
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