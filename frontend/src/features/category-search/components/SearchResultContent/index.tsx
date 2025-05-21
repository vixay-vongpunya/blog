'use client'

import BigBlogCard from "@/components/BigBlogCard";
import { Box, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import AuthorCardList from "../AuthorCardList";
import PostList from "@/common/post-list/PostList";
import { Post } from "@/domains/post/types";
import {RoundButton} from "@/components/Button";
import ProfileImage from "@/components/ProfileImage";
import { queryKey, usePostCard } from "@/common/hooks/post-card-hook";
import PostCardFooter from "@/common/PostCardFooter";

type SearchResultContentProps = {
    posts: Post[];
    categoryId: string;
}

function SearchResultContent({posts, categoryId}: SearchResultContentProps){
    const {onClickPost, onClickProfile, onClickCategory, onClickSave} = usePostCard()
    console.log(posts)

    const mainRecommendation = (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: '4fr 5fr',
            gap:4,
            maxheight: 'fit-content'
            }}>
            <BigBlogCard key={posts[0].id} post={posts[0]} categoryId={categoryId} />
            <Stack justifyContent='space-between'>
                {posts.slice(1,4).map((post)=>(
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
                                    onClickSave={(event)=>onClickSave(event, post.id, post.savedPost, queryKey.postsByCategory(categoryId))}/>
                            </CardActions>
                        </Stack>                  
                    </Box>
                </Card>
            ))}
            </Stack>
        </Box>   
    )
    
    return(
        <Stack sx={{ gap: 8 }}>
            <Stack sx={{ gap: 2 }}>
                <Typography variant='h4'>Recommended Posts</Typography>
                {mainRecommendation}
            </Stack>
            <Stack sx={{ gap:2 }}>
                <PostList posts={posts.slice(4)} queryKey={queryKey.postsByCategory(categoryId)}/>
                <RoundButton text='See more recommended posts' onClick={()=>{}}/>
            </Stack> 
            <Stack sx={{ gap:2 }}>
                <Typography variant='h4'>Our authors</Typography>
                <AuthorCardList/>
                <RoundButton text='See more authors' onClick={()=>{}}/>
            </Stack>        
        </Stack>
    )
}

export default SearchResultContent;