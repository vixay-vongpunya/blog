'use client'

import BigBlogCard from "@/components/BigBlogCard";
import { Box, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { Post } from "@/domains/post/types";
import ProfileImage from "@/components/ProfileImage";
import { queryKey, usePostCard } from "@/components/post-list-hooks/post-card-hook";
import { useMemo } from "react";
import { formatDate } from "@/utils/date-formating";
import PostCardFooter from "@/components/PostCardFooter";

type MainRecommendationProps = {
    posts: Post[];
    categoryId: string;
}

function MainRecommendation({posts, categoryId}: MainRecommendationProps){
    const {onClickPost, onClickProfile, onClickCategory, onClickSave} = usePostCard()
    const postList = useMemo(()=>
        posts?.map(post=>({...post, createdAt: formatDate(post.createdAt)}))
    ,[posts])
    
    return(
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: '4fr 5fr',
            gap:4,
            maxheight: 'fit-content'
            }}>
            <BigBlogCard key={postList[0].id} post={postList[0]} categoryId={categoryId} />
            <Stack justifyContent='space-between'>
                {postList.slice(1,4).map((post)=>(
                <Card 
                    key={post.id}
                    elevation={0}
                    sx={{ 
                        display: 'flex', 
                        height: 150,
                        borderRadius: 0,
                        cursor: 'pointer',
                        backgroundColor: 'transparent'}} 
                    onClick={()=>onClickPost(post.id, post.title)}>
                    <Box display='flex' gap= '0.8em' width='100%'>
                        <CardMedia 
                            component='img'
                            image='./../person.jpg'
                            sx={{ width: 150}}/>
                        <Stack justifyContent='space-between' width='100%'>
                            <CardContent  sx={{display: "flex", flexDirection: "column", gap:1, paddingTop:0}}>
                                <Typography variant="h5" sx={{
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    WebkitLineClamp: 1,
                                }}>{post.title}</Typography>
                                <Stack 
                                    direction='row' 
                                    sx={{ gap: '0.5em', alignItems: 'center' }}
                                    onClick={(event)=>onClickProfile(event, post.author)}>
                                        <ProfileImage size='tiny' path={post.author.name} alt={post.image}/>
                                        <Typography variant='body2' color='textSecondary'>{post.author.name} &middot; {post.createdAt}</Typography>
                                </Stack>
                                {/* need to work on here */}
                                <Typography sx={{
                                    color: 'text.secondary',
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    WebkitLineClamp: 2,
                                }}>{post.preview}</Typography>     
                            </CardContent>
                            <CardActions sx={{justifyContent: 'space-between'}}>
                                <PostCardFooter 
                                    savedPost={post.savedPost}
                                    categories={post.categories} 
                                    onClickCategory={(event, category)=>onClickCategory(event, category)} 
                                    onClickSave={(event)=>onClickSave(event, 0, post.id, post.savedPost, queryKey.postsByCategory(categoryId))}/>
                            </CardActions>
                        </Stack>                  
                    </Box>
                </Card>
            ))}
            </Stack>
        </Box> 
    )
}

export default MainRecommendation;