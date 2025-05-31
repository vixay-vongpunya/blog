import { User } from "@/domains/user/types"
import { Page } from "@/providers/PageProviders/hook"
import { Box, Button, Card, Stack, Typography } from "@mui/material"
import { useRouter } from "next/navigation"

type AuthorCardListProps = {
    authors: {
        id: string,
        name: string,
    }[]
}
function AuthorCardList({authors}: AuthorCardListProps){
    const router = useRouter()
    return(

        <Box sx={{
            display: 'flex',
            gap: 2}}>
                {authors.map((author, index)=>(
                <Card key={index} variant='outlined' 
                    sx={{
                        position: 'relative',
                        height: '300px',
                        padding: '1.5em',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        gap:1,
                        cursor: 'pointer',
                    }}
                     onClick={() => router.push(Page.Post + `/${index}`)}>
                {/* backgorund image */}
                <Stack
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '80px',
                        backgroundImage: 'url(/person.jpg)',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        zIndex: 0,
                    }}/>

                    <Box  sx={{
                        flexShrink:0,
                        borderRadius: '50%', 
                        height: '5em', 
                        width: '5em', 
                        overflow:'hidden',
                        cursor: 'pointer',
                        zIndex:2}}>
                        <img src="./../person.jpg" className="object-cover h-full w-full"/>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap:'0.5em'}}>
                        <Stack>
                            <Typography variant="body2" 
                                sx={{fontWeight: "bold",
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    WebkitLineClamp: 1,
                                }} >{author.name}</Typography>
                            <Typography variant="body2" 
                                sx={{
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    WebkitLineClamp: 1,
                                }} >2.4k followers</Typography>
                        </Stack>
                        <Typography  
                            sx={{
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                WebkitLineClamp: 3,
                                }}color='text.secondary'>{author.name}</Typography>                       
                    </Box>
                    <Stack direction='row' sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                </Stack>     
                <Button variant='contained' fullWidth sx={{
                    padding: '0.3em 0.6em', 
                    borderRadius: '99em', 
                    justifySelf: 'center'}}>Follow</Button> 
                      
        </Card>
        ))} 
        </Box>      
    )
}

export default AuthorCardList;