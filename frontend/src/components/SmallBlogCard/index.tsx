import { Box, Button, Card, Stack, Typography } from "@mui/material"
import { Post } from "@/domains/post/types"
import ProfileImage from "../ProfileImage"


function SmallBlogCard({item} : {item : Post}){
    return(
        <Stack sx={{flexDirection:'column', width:'100%', gap:0.5}}>
            <Box display='flex' gap={1}>
                <ProfileImage size='tiny' path={item.image} alt={item.author.name}/>
                <Typography variant='body2' alignSelf="center">{item.author.name}</Typography>
            </Box>
            <Typography variant="h6" 
                sx={{fontWeight: 'bold',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    WebkitLineClamp: 1,
                }} >{item.title}</Typography>
            <Box className='flex gap-4 items-center'>
                <Typography  
                variant='body1'
                sx={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    WebkitLineClamp: 1,
                }} color='text.secondary'>{item.preview}</Typography>    
            </Box>
        </Stack>            
    )
}

export default SmallBlogCard