import { usePostCard } from "@/common/hooks/post-card-hook"
import PostCardFooter from "@/common/PostCardFooter"
import { Post } from "@/domains/post/types"
import { formatDate } from "@/utils/date-formating"
import { Box, Card, CardActions, CardContent, CardMedia, Divider, Pagination, Stack, Typography } from "@mui/material"
import { useMemo } from "react"


function RecentBlogCard({posts}:{posts: Post[]}){
    const {onClickPost, onClickProfile, onClickCategory, onClickSave} = usePostCard()
    const postList = useMemo(()=>
            posts.map(post=>({...post, createdAt: formatDate(post.createdAt)}))
        ,[posts])
    console.log(postList)
    return(
        <Box sx={{
            display:"flex", 
            flexDirection:"column", 
            gap:3,
            paddingRight: '5em'}}>
            {postList?.map(({id, title, preview, author, categories, createdAt})=>(
                <Card 
                    key={id}  
                    elevation={0}
                    sx={{
                        display: "grid", 
                        gridTemplateColumns: "3fr 1fr", 
                        gap: 2,
                        height: 200,
                        borderRadius: 0,
                        backgroundColor: 'transparent'
                        }} >
                    <Stack>
                        <CardContent>
                            <Typography variant="h5" sx={{
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                WebkitLineClamp: 2,
                            }}>{title}</Typography>
                            <Typography variant="body2" sx={{color:'text.secondary'}}>{createdAt} &middot; {author.name}</Typography>
                            {/* need to work on here */}
                            <Typography sx={{
                                color: 'text.secondary',
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                WebkitLineClamp: 2,
                                marginTop: 2 
                            }}>{preview}</Typography>
                            
                        </CardContent>
                        <CardActions sx={{display: 'flex', justifyContent: 'space-between', marginTop: 'auto'}}>
                            <PostCardFooter 
                                categories={categories} 
                                onClickCategory={(event, category)=>onClickCategory(event, category)} 
                                onClickSave={(event)=>onClickSave(event, id)}/>
                        </CardActions>
                    </Stack>
                    <CardMedia
                        component='img'
                        image='../person.jpg'
                        sx={{height: '80%', alignSelf: 'center'}}/>
                    <Divider sx={{color:'text.secondary'}}/>
                </Card>
            ))}
            <Pagination hidePrevButton hideNextButton sx={{alignSelf: 'center', margin:'auto'}} count={10} boundaryCount={10}/>
        </Box>

    )
}

export default RecentBlogCard