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
                        <Box display='flex'>
                            {categories?.slice(0,2).map((category: Category)=>(
                            <Button 
                                key={category.id}
                                variant='outlined' 
                                sx={{ minWidth: 'fit-content', padding: '0.2em 0.4em', borderRadius: 2}}
                                onClick={(event) => onClickCategory(event, category)}>
                                    <Typography variant="body2">
                                        {category.name}
                                    </Typography>
                            </Button>
                            ))}
                            {categories?.length>3 && (
                                <Button variant='outlined' 
                                    sx={{ minWidth: 'fit-content',padding: '0.2em 0.4em',borderRadius: 2}}>
                                        <Typography variant="body2">
                                        +{categories.length - 2}
                                        </Typography>
                                    </Button>
                                )}
                        </Box> 
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