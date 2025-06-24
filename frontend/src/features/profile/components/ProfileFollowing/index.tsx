'use client'
import { Box, Stack, Typography } from "@mui/material"
import { useGetAccount, useGetUserSubscriptionFollowingQuery } from "../../hooks/query"
import ProfileImage from "@/components/ProfileImage"
import { SubscribeButton } from "@/components/Button"

type ProfileFollowingProps = {
    userName: string
}

function ProfileFollowing({userName}: ProfileFollowingProps){
    //can just do it once at card
    const {data: user} = useGetAccount(userName)
    const {data: followingUsers} = useGetUserSubscriptionFollowingQuery(user?.id)
    return(
        <Stack gap={4}>
            {
                followingUsers?.pages.map(page=>(
                    page.map(({author}:any)=>(
                        <Box key={author.id} display='flex' justifyContent='center'>
                            <ProfileImage size='big' path={author.profileImage} alt={author.name}/>
                            <Stack justifyContent={author.bio ? 'space-between' : 'center'}
                                sx={{
                                    ml:{
                                        xs: '1em',
                                        sm: '2em'
                                    }
                                }}>
                                <Typography fontWeight='bold' variant="h5">{author.name}</Typography>
                                {
                                    author.bio && <Typography color='textSecondary'>{author.bio}</Typography>
                                }
                                
                            </Stack>
                            <Box ml='auto'>
                                <SubscribeButton isSubscribed={true} handleSubscribe={()=>{}} handleUnsubscribe={()=>{}}/>
                            </Box>
                        </Box>
                    ))
                ))
            }
        </Stack>
    )
}

export default ProfileFollowing