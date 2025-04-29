import { Page, PagePath } from "@/providers/PageProviders/hook"
import { Box, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material"
import SmallImage from "../../../components/SmallImage"
import { ReactNode } from "react"
import { Post } from "@/domains/post/types"

export type PostCardProps = {
    post: Post,
    onClickProfile: (event: React.MouseEvent<HTMLDivElement>)=>void,
    onClickPost: ()=>void,
    cardFooter: ReactNode,
}

function PostCard({post, onClickProfile, onClickPost, cardFooter}:PostCardProps){
    return(
        <Card 
            elevation={0}
            sx={{
                height: 340,
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
                image="./../person.jpg"
                sx={{height: 160}}
            />
            <CardContent>
                <Stack direction='row' 
                    sx={{ gap: '0.5em', alignItems: 'center', zIndex: 10 }}
                    onClick={(event)=>onClickProfile(event)}>
                        <SmallImage/>
                        <Typography variant='body2' color='text.secondary'>{post.author.name} &middot; {post.createdAt}</Typography>
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
                            WebkitLineClamp: 2,
                        }}color='text.secondary'>{post.preview}</Typography>                       
                    </Box>    
                </Stack>            
            </CardContent>
            <CardActions disableSpacing sx={{justifyContent: 'space-between', marginTop: 'auto'}}>
                {cardFooter}
            </CardActions>
        </Card>
    )
}

export default PostCard