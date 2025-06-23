import { Box, Stack, Typography } from "@mui/material";
import ProfileImage from "../ProfileImage";
import { SubscribeButton } from "../Button";
import { Author } from "@/domains/user/types";

type FollowingListProps = {
    authors: Author[]
}

function FollowingList({authors}: FollowingListProps){
    return(
        <Stack sx={{
            gap:{
                xs:'2em',
                sm:'4em'
            }
        }}>
            {
                authors.map((author:any)=>(
                    <Box key={author.id} display='flex' 
                    sx={{
                        gap:{
                            xs: '1em',
                            sm: '2em'
                        }
                    }}>
                        <ProfileImage size='big' path={author.profileImage} alt={author.name}/>
                        <Stack justifyContent='space-between'ml={1}>
                            <Typography>{author.name}</Typography>
                            <Typography color='text.secondary'
                            sx={{
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                WebkitLineClamp: 4,
                            }}>{author.bio}</Typography>
                        </Stack>
                        <Box ml='auto'>
                            <SubscribeButton isSubscribed={true} handleSubscribe={()=>{}} handleUnsubscribe={()=>{}}/>
                        </Box>
                    </Box>
                ))
            }
        </Stack>
        
    )
}

export default FollowingList