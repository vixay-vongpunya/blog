import { Page } from "@/providers/PageProviders/hook"
import { Box, Button, Card, Stack, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import SmallImage from "../SmallImage"
import { SaveIcon } from "../Icons/CustomIcons"
import { Post } from "@/api/post"
import { Category } from "@/api/category"
import { useData } from "@/providers/DataProvider"
import PostCardFooter from "../PostCardFooter"
import { PostCardProps } from "../PostCard"

function BigBlogCard({id, title, preview, categories, author, created}: PostCardProps){
    const router = useRouter()
    return(
        <Stack
            sx={{
                // transition: 'transform 0.3s',
                cursor: 'pointer',
                borderRadius: 0,
                border: 'none',
                gap:'0.8em',
                paddingTop: '0.5em'
                // '&:hover':{
                //     transform: 'scale(105%)'
                // }

            }}
            onClick={()=>router.push(Page.Post+`/${id}`)}>
            <Box className="relative h-82">
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
                <PostCardFooter categories={categories}/>             
            </Stack>            
        </Stack>
    )
}

export default BigBlogCard;