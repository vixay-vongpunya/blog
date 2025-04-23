import { Blog, category } from "@/data/post"
import { Page } from "@/providers/PageProviders/hook"
import { Box, Button, Card, Stack, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import SmallImage from "../SmallImage"


function SmallBlogCard({item}:{item:Blog}){
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
                            }} >{item.title}</Typography>
                        <Typography sx={{fontWeight: ''}}>{item.author.name}</Typography>
                    </Stack>
    
                    <Button variant='outlined' sx={{padding: '2px 12px', borderRadius: '99em'}}>follow</Button>                                       
                </Box>
                <Box className="flex gap-4 items-center">
                        <Typography  sx={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            WebkitLineClamp: 3,
                        }}color='text.secondary'>{item.content}</Typography>    
                </Box>
            </Box>
        </Stack>            
    )
}

export default SmallBlogCard