import { SubscribeButton } from "@/components/Button"
import ProfileImage from "@/components/ProfileImage"
import { AuthorCard, User } from "@/domains/user/types"
import { Page, PagePath } from "@/providers/PageProviders/hook"
import { Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material"
import { useRouter } from "next/navigation"

type AuthorCardListProps = {
    authors : AuthorCard[]
}
function AuthorCardList({authors}: AuthorCardListProps){
    const router = useRouter()

    return(
        <Box sx={{
            display: 'flex',
            gap: 2}}>
            {authors.slice(0,5).map((author, index)=>(
                <Card key={index} variant='outlined' 
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        height: 300,
                        minWidth: '200px',
                        gap:1,
                        cursor: 'pointer',
                    }}
                    onClick={() => router.push(`${PagePath[Page.Profile]}/${author.name}-${author.id}`)}>
                    {/* backgorund image */}
                    <CardMedia
                        component='img'
                        image='../../person.jpg'
                        sx={{height: 80, border: 'none'}}
                    />
                    <CardContent sx={{
                        display: 'flex', 
                        flexDirection: 'column', 
                        marginTop: '-5em', 
                        paddingX:'1.5em', 
                        paddingBottom:'1.5em', 
                        flexGrow: 1}}>
                        <ProfileImage size='large' path='../../person.jpg' alt=''/>
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
                                    }} >{author.followerCount} followers</Typography>
                            </Stack>
                            <Typography  
                                sx={{
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    WebkitLineClamp: 3,
                                    }}color='text.secondary'>{author.bio}</Typography>                       
                        </Box>
                        <CardActions sx={{marginTop: 'auto', width: '100%'}}>
                            <SubscribeButton fullWidth={true} isSubscribed={!!author.subscription.id} handleSubscribe={()=>{}} handleUnsubscribe={()=>{}}/> 
                        </CardActions> 
                    </CardContent>  
                </Card>
            ))} 
        </Box>      
    )
}

export default AuthorCardList;