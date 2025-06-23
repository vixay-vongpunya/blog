import { Box, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material"
import { queryKey, usePostCard } from "@/components/post-list-hooks/post-card-hook"
import { Post } from "@/domains/post/types"
import ProfileImage from "../ProfileImage"
import PostCardFooter from "../PostCardFooter"

type BigPostCardProps = {
    post: Post;
    categoryId: string;
}

function BigPostCard({post, categoryId}: BigPostCardProps){
    const {onClickProfile, onClickPost, onClickCategory, onClickSave} = usePostCard()
    return(
        <Card 
            elevation={0}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: 480,
                cursor: 'pointer',
                borderRadius: 0,
                border: 'none',
                backgroundColor: 'transparent',
            }}
            onClick={()=>onClickPost(post.id, post.title)}>
            <CardMedia
                image="./../person.jpg"
                sx={{height: 300}}
            />
            <CardContent>
                <Stack 
                    direction='row' 
                    sx={{ gap: '0.5em', alignItems: 'center', zIndex: 10 }}
                    onClick={(event)=>onClickProfile(event, {id: post.author.id, name: post.author.name})}>
                        <ProfileImage size='tiny' path='' alt='not found'/>
                        <Typography variant='body2' color='text.secondary'>{post.author.name} &middot; {post.createdAt.toString()}</Typography>
                </Stack>
                <Stack sx={{flexDirection:'column', gap: '0.5em'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap:'0.5em'}}>
                        <Typography variant="h5" 
                        sx={{fontWeight: "bold",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            WebkitLineClamp: 2,
                        }} >{post.title}</Typography>
                        <Typography  sx={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            WebkitLineClamp: 4,
                        }}color='text.secondary'>{post.preview}</Typography>                       
                    </Box>    
                </Stack>            
            </CardContent>
            <CardActions disableSpacing sx={{justifyContent: 'space-between', marginTop: 'auto'}}>
                <PostCardFooter 
                    savedPost={post.savedPost}
                    categories={post.categories} 
                    onClickCategory={(event, category)=>onClickCategory(event, category)} 
                    onClickSave={(event)=>onClickSave(event, 0, post.id, post.savedPost, queryKey.postsByCategory(categoryId))}/>
            </CardActions>
        </Card>
    )
}

export default BigPostCard;