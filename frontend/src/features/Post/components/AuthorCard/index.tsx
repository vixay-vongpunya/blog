import { Box, Button, Stack, Typography } from "@mui/material"

function AuthorCard({id, author}:{id:string, author: string}){
    return(
        <Stack sx={{flexDirection:'row', width:'100%', gap: '0.5em', alignItems:'center', justifyContent: 'center'}}>
            <Box  sx={{flexShrink:0, borderRadius: '50%', height: '4em', width: '4em', overflow:'hidden'}}>
                <img src="./../person.jpg" className="object-cover h-full w-full"/>
            </Box>
            <Stack>
                <Stack flexDirection='row' sx={{alignItems: 'center', gap: '0.5em'}}>
                    <Typography variant="h4" 
                        sx={{fontWeight: "bold",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            WebkitLineClamp: 1,
                        }} >{author}</Typography>
                    <Button variant='outlined' sx={{padding: '2px 12px', borderRadius: '99em', width: 'fit-content'}}>Follow</Button> 
                </Stack>
                <Typography variant='body2' color='text.secondary'>44k followers &middot; 1.1k following</Typography>
            </Stack>                                                            
        </Stack>            
    )
}

export default AuthorCard