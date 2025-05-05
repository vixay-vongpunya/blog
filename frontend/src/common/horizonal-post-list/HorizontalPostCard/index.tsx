import { Box, Card, CardActionArea, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material"
import SmallImage from "../../../components/SmallImage"
import PostCardFooter from "../../PostCardFooter"
import { PostCardProps } from "@/common/post-list/PostCard"

function HorizontalPostCard({post, onClickProfile, onClickPost, cardFooter}:PostCardProps){
    return(
        <Card 
            elevation={0}
            sx={{ 
                display: 'flex', 
                height: 150,
                borderRadius: 0,
                cursor: 'pointer',
                backgroundColor: 'transparent'}} 
                onClick={onClickPost}>
            <Box display='flex' sx={{gap: '0.8em'}}>
                <CardMedia 
                    component='img'
                    image='./../person.jpg'
                    sx={{ width: 150}}/>
                <Stack justifyContent='space-between'>
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
                            onClick={(event)=>onClickProfile(event)}>
                                <SmallImage/>
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
                        {cardFooter}
                    </CardActions>
                </Stack>                  
            </Box>
        </Card>
    )
}

export default HorizontalPostCard