import { Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material"
import { ReactNode } from "react"
import { Post } from "@/domains/post/types"
import ProfileImage from "../../ProfileImage"
import { Category } from "@/domains/category/types"
import CategoryList from "@/components/CategoryList"

export type PostCardProps = {
    post: Post,
    categories: Category[],
    onClickCategory: (event: React.MouseEvent<HTMLButtonElement>, category: Category)=>void,
    onClickProfile: (event: React.MouseEvent<HTMLDivElement>)=>void,
    onClickPost: () => void,
    cardFooter: ReactNode,
}

function PostCard({post, categories, onClickCategory, onClickProfile, onClickPost, cardFooter}:PostCardProps){
    return(
        <Card 
            elevation={0}
            sx={{
                minHeight: 340,
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                borderRadius: 0,
                border: 'none',
                backgroundColor: 'transparent',
            }}
            onClick={onClickPost}>
            <CardMedia
                component='img'
                image={post.image} 
                sx={{height: 160, border: 'none'}}
            />
            <CardContent sx={{display: 'flex', flexDirection: 'column', gap: "1em", flexGrow:1}}>
                <Stack direction='row' 
                    sx={{ gap: '0.5em', alignItems: 'center'}}>
                        <Box display='flex' 
                            sx={{ gap: '0.5em', alignItems: 'center'}} 
                            onClick={(event)=>onClickProfile(event)}>
                            <ProfileImage size='tiny' path={post.image} alt={post.author.name}/>
                            <Typography variant='body1' color='text.secondary' 
                                sx={{
                                    '&:hover': {
                                        textDecoration: 'underline'
                                }}}>{post.author.name}</Typography>
                        </Box>
                        <Typography variant='body2' color='text.secondary'>&middot; {post.createdAt}</Typography>
                </Stack>
                <Stack sx={{flexDirection:'column', gap: '0.5em'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap:'0.5em'}}>
                        <Typography variant="h5" 
                        color='text.primary'
                        sx={{fontWeight: "bold",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            WebkitLineClamp: 2,
                        }}>{post.title}</Typography>
                        <Typography  sx={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            WebkitLineClamp: 2,
                        }}color='text.secondary'>{post.preview}</Typography>                       
                    </Box> 
                </Stack>
                <CategoryList categories={categories} size="small"/>          
            </CardContent>
            <CardActions disableSpacing sx={{justifyContent: 'space-between'}}>
                {cardFooter}
            </CardActions>
        </Card>
    )
}

export default PostCard