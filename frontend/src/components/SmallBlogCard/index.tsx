import { Page } from "@/providers/PageProviders/hook"
import { Box, Button, Card, Stack, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import SmallImage from "../SmallImage"
import { Post } from "@/api/post"


function SmallBlogCard({item} : {item : Post}){
    const route = useRouter()
    return(
        <Stack sx={{flexDirection:'column', width:'100%', gap: 1}}>
            <Box display='flex' gap={1}>
                <SmallImage/>
                <Typography variant='body2'>{item.author.name}</Typography>
            </Box>
            <Box sx={{display: 'flex', 
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap:'0.5em'}}>
                <Stack>
                    <Typography variant="h6" 
                        sx={{fontWeight: "bold",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            WebkitLineClamp: 1,
                        }} >{item.title}</Typography>

                </Stack>
                {/* <Button variant='outlined' sx={{padding: '2px 12px', borderRadius: '99em'}}>follow</Button>                                        */}
            </Box>
            <Box className="flex gap-4 items-center">
                    <Typography  
                    variant='body1'
                    sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        WebkitLineClamp: 2,
                    }}color='text.secondary'>{item.preview}</Typography>    
            </Box>
        </Stack>            
    )
}

export default SmallBlogCard