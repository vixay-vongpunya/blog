import { Page } from "@/providers/PageProviders/hook"
import { Box, Stack, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import SmallImage from "../SmallImage"
import PostCardFooter from "../PostCardFooter"
import { Category } from "@/api/category"

export type PostCardProps = {
    id: string,
    title: string,
    preview: string,
    categories: Category[],
    author: string,
    created: string,
}

function PostCard({id, title, preview, categories, author, created}:PostCardProps){
    const router = useRouter()
    return(
        <Stack 
            sx={{
                // transition: 'transform 0.3s',
                cursor: 'pointer',
                borderRadius: 0,
                border: 'none',
                gap:'0.8em'
                // '&:hover':{
                //     transform: 'scale(105%)'
                // }
            }}
            onClick={()=>router.push(Page.Post+`/${id}`)}>
            <Box className="relative h-48">
                <img src="./../person.jpg" className="object-cover h-full w-full"/>
            </Box>
            <Stack direction='row' sx={{
                    gap: '0.5em',
                    alignItems: 'center'
                }}>
                    <SmallImage/>
                    <Typography variant='body2' color='textSecondary'>{author} &middot; {created}</Typography>
            </Stack>
            <Stack sx={{flexDirection:'column', gap: '0.5em'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap:'0.5em'}}>
                    <Typography variant="h5" 
                    sx={{fontWeight: "bold",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        WebkitLineClamp: 2,
                    }} >{title}</Typography>
                    <Typography  sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        WebkitLineClamp: 3,
                    }}color='text.secondary'>{preview}</Typography>                       
                </Box>
                <PostCardFooter categories={categories} />       
            </Stack>            
        </Stack>
    )
}

export default PostCard