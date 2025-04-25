import { Box, Button, Card, Divider, Pagination, Stack, Typography } from "@mui/material"
import SmallImage from "../SmallImage"
import { SaveIcon } from "../Icons/CustomIcons"
import { Post } from "@/api/post"
import { PostCardProps } from "../PostCard"
import { Category } from "@/api/category"
import PostCardFooter from "../PostCardFooter"

function HorizontalBlogCard({id, title, preview, created, author, categories}:PostCardProps){
    return(
        <Box sx={{
            display: "grid", 
            gridTemplateColumns: "3fr 5fr", 
            gap: 2,
            height: '150px'}} >
            <Box sx={{padding: '0.5em'}}>
                <img src="../person.jpg" className="object-cover h-full"/>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", gap:1, paddingY: "0.5em"}}>    
                <Typography variant="h5" sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    WebkitLineClamp: 1,
                }}>{title}</Typography>
                <Stack 
                    direction='row' 
                    sx={{ gap: '0.5em', alignItems: 'center' }}>
                        <SmallImage/>
                        <Typography variant='body2' color='textSecondary'>{author} &middot; {created}</Typography>
                </Stack>
                {/* need to work on here */}
                <Typography sx={{
                    color: 'text.secondary',
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    WebkitLineClamp: 2,
                }}>{preview}</Typography>     
                <PostCardFooter categories={categories}/>
            </Box>
        </Box>
    )
}

export default HorizontalBlogCard