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
                        <Box key={author.id} display='flex' alignItems='center'>
                            <ProfileImage size='big' path={author.profileImage} alt={author.name}/>
                            <Stack justifyContent='space-between' ml={1}>
                                <Typography>{author.name}</Typography>
                                <Typography>{author.bio}</Typography>
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