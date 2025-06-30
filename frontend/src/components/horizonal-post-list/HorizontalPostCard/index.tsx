import CategoryList from "@/components/CategoryList";
import { Category } from "@/domains/category/types";
import { Post } from "@/domains/post/types"
import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Stack, Typography } from "@mui/material"
import { ReactNode } from "react"

export type HorizontalCardProps = {
    post: Post;
    isProfile: boolean | undefined;
    categories: Category[],
    onClickCategory: (event: React.MouseEvent<HTMLButtonElement>, category: Category)=>void,
    onClickProfile: (event: React.MouseEvent<HTMLSpanElement>)=>void;
    onClickPost: ()=>void;
    cardFooter: ReactNode;
}

function HorizontalPostCard({post, categories, onClickCategory, isProfile, onClickProfile, onClickPost, cardFooter}: HorizontalCardProps){
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
                    <Box display="flex" flexDirection="column"  gap="1em">
                        <Box display='flex' flexDirection='column'>
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
                            }}>{post.createdAt} &middot;
                            <span className='hover:underline' onClick={(event)=>onClickProfile(event)}> {post.author.name}</span>
                            </Typography>
                        </Box>
                        {/* need to work on here */}
                        <Typography sx={{
                            color: 'text.secondary',
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            WebkitLineClamp: 2, 
                        }}>{post.preview}</Typography>
                        <CategoryList categories={categories} size="small"/>
                    </Box>
                </CardContent>
                <CardActions sx={{justifyContent: 'space-between'}}>
                    {cardFooter}
                </CardActions>
            </Stack>
            <CardMedia
                sizes="100px"
                component='img'
                image='../person.jpg'
                sx={{alignSelf: 'center'}}/>
            <Divider sx={{color:'text.secondary'}}/>
        </Card>
        
    )
}

export default HorizontalPostCard