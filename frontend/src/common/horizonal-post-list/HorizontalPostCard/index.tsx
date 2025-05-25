import { Post } from "@/domains/post/types"
import { Box, Card, CardActions, CardContent, CardMedia, Divider, Stack, Typography } from "@mui/material"
import { ReactNode } from "react"

export type HorizontalCardProps = {
    post: Post;
    isProfile: boolean | undefined;
    onClickProfile: (event: React.MouseEvent<HTMLSpanElement>)=>void;
    onClickPost: ()=>void;
    cardFooter: ReactNode;

}

function HorizontalPostCard({post, isProfile, onClickProfile, onClickPost, cardFooter}: HorizontalCardProps){
    return(
        <Card 
            key={post.id}  
            elevation={0}
            sx={{
                display: "grid", 
                gridTemplateColumns: "3fr 1fr", 
                gap: 2,
                height: 200,
                borderRadius: 0,
                backgroundColor: 'transparent',
                cursor: 'pointer'
                }}
            onClick={onClickPost}>
            <Stack justifyContent='space-between'>
                <CardContent>
                    <Typography variant="h5" sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        WebkitLineClamp: 2,
                    }}>{post.title}</Typography>
                    <Typography 
                        variant="body2" 
                        sx={{
                            color:'text.secondary', 
                            display: isProfile ? 'none': 'block',
                        }}>{post.createdAt} &middot;</Typography>
                        <Typography 
                            variant="body2" 
                            sx={{
                                color:'text.secondary', 
                                display: isProfile ? 'none': 'block',
                                '&:hover':{
                                    textDecoration: 'underline',
                                }
                            }}
                        onClick={(event)=>onClickProfile(event)}>{post.author.name}</Typography>
                    {/* need to work on here */}
                    <Typography sx={{
                        color: 'text.secondary',
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        WebkitLineClamp: 2,
                        marginTop: 2 
                    }}>{post.preview}</Typography>
                    
                </CardContent>
                <CardActions sx={{justifyContent: 'space-between'}}>
                    {cardFooter}
                </CardActions>
            </Stack>
            <CardMedia
                component='img'
                image='../person.jpg'
                sx={{height: '80%', alignSelf: 'center'}}/>
            <Divider sx={{color:'text.secondary'}}/>
        </Card>
        
    )
}

export default HorizontalPostCard