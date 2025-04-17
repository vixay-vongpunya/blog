import { category } from "@/data/blogs"
import { Page } from "@/providers/PageProviders/hook"
import { Box, Button, Card, Stack, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import SmallImage from "../SmallImage"

type BlogCardProps = {
    id: string,
    title: string,
    content: string,
    author: string,
    created: string,
}

function SmallBlogCard({id, title, content, author, created}:BlogCardProps){
    const route = useRouter()
    return(
        <Stack sx={{flexDirection:'row', width:'100%', gap: '0.5em'}}>
            <SmallImage/>
            <Box>
                <Box sx={{display: 'flex', 
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap:'0.5em'}}>
                    <Stack>
                        <Typography variant="body1" 
                            sx={{fontWeight: "bold",
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                WebkitLineClamp: 1,
                            }} >{title}</Typography>
                        <Typography sx={{fontWeight: ''}}>{author}</Typography>
                    </Stack>
    
                    <Button variant='outlined' sx={{padding: '2px 12px', borderRadius: '99em'}}>follow</Button>                                       
                </Box>
                <Box className="flex gap-4 items-center">
                        <Typography  sx={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            WebkitLineClamp: 3,
                        }}color='text.secondary'>{content}</Typography>    
                </Box>
            </Box>
        </Stack>            
    )
}

export default SmallBlogCard