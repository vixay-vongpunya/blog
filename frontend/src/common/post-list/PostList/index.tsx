import { Post } from "@/api/post";
import { Box, Pagination } from "@mui/material";
import PostCard from "../PostCard";
import { usePostCard } from "@/common/hooks/post-card-hook";
import PostCardFooter from "@/common/PostCardFooter";
import { formatDate } from "@/utils/date-formating";
import { useMemo } from "react";

function PostList({posts}:{posts: Post[]}){
    const {onClickPost, onClickProfile, onClickCategory, onClickSave} = usePostCard()

    const postList = useMemo(()=>
        posts.map(post=>({...post, created: formatDate(post.created)}))
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
            <Pagination hidePrevButton hideNextButton sx={{alignSelf: 'center', margin:'auto'}} count={10} boundaryCount={10}/>
        </Box>
    )
}

export default PostList;