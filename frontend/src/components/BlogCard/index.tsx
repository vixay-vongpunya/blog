import { category } from "@/data/blogs"
import { Page } from "@/providers/PageProviders/hook"
import { Box, Card, Stack, Typography } from "@mui/material"
import { useRouter } from "next/navigation"

type BlogCardProps = {
    id: string,
    title: string,
    content: string,
    author: string,
    created: string,
}

function BlogCard({id, title, content, author, created}:BlogCardProps){
    const route = useRouter()
    return(
        <Box key={id} className="rounded-lg shadow-sm transition-transform duration-300 hover:scale-105 cursor-pointer" 
        onClick={()=>route.push(Page.Post+`/${id}`)}>
            <Box className="relative h-48">
                <img src="./../globe.svg" className="object-cover h-full w-full"/>
            </Box>
            <Stack sx={{flexDirection:'column', padding: '0.5em 1.5em', paddingBottom: '1.8em', gap: '0.5em'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap:'0.5em'}}>
                    <Typography variant="h5" sx={{fontWeight: "bold"}}>{title}</Typography>
                    <Typography className="line-clamp-3" color='text.secondary'>{content}</Typography>                       
                </Box>
                <Box className="flex gap-4 items-center">
                    <Box className="rounded-full h-10 w-10 overflow-hidden">
                        <img src="./../person.jpg" className="object-cover h-full w-full"/>
                    </Box>
                    <Box className="flex flex-col">
                        <Typography sx={{fontWeight: ''}}>{author}</Typography>
                        <Typography variant='body2' color='text.secondary'>{created}</Typography>
                    </Box>
                </Box>
            </Stack>            
        </Box>
    )
}

export default BlogCard