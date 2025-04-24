
import { Box, Button, Stack, Typography } from "@mui/material";



function CommentCard({id, title, content, author, created}:any){
    return(
        <Stack key={id} sx={{flexDirection:'row', width:'100%', gap: '0.5em'}}>
            <Box  sx={{flexShrink:0, borderRadius: '50%', height: '3em', width: '3em', overflow:'hidden'}}>
                    <img src="./../person.jpg" className="object-cover h-full w-full"/>
            </Box>
            <Box>
                <Box sx={{display: 'flex', 
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap:'5em'}}>
                    <Typography sx={{fontWeight: ''}}>{author}</Typography>                                    
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

export default CommentCard;