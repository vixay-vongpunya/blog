'use client'
import { Box, Stack, Typography } from "@mui/material"
import { useGetAccount, useGetUserSubscriptionFollowingQuery } from "../../hooks/query"
import ProfileImage from "@/components/ProfileImage"
import { SubscribeButton } from "@/components/Button"
import { useRouter } from "next/navigation"
import { Page, PagePath } from "@/providers/PageProviders/hook"
import { useSubscriptionHandler } from "../../hooks/subscription-handler-hook"

type ProfileFollowingProps = {
    userName: string
}

function ProfileFollowing({userName}: ProfileFollowingProps){
    //can just do it once at card
    const router = useRouter()
    const {data: user} = useGetAccount(userName)
    const {data: followingUsers} = useGetUserSubscriptionFollowingQuery(user?.id)
    const {handleSubscribe, handleUnSubscribe} = useSubscriptionHandler()
    console.log(followingUsers)
    return(
        <Stack gap={4}>
            {
                followingUsers?.pages.map(page=>(
                    page.map((data)=>(
                        <Box key={data.author.id} display='flex' justifyContent='center' onClick={()=>router.push(PagePath[Page.Profile]+`/${data.author.name}?source=posts`)}>
                            <ProfileImage size='big' path={data.author.profileImage} alt={data.author.displayName}/>
                            <Stack justifyContent={data.author.bio ? 'space-between' : 'center'}
                                sx={{
                                    ml:{
                                        xs: '1em',
                                        sm: '2em'
                                    }
                                }}>
                                <Typography fontWeight='bold' variant="h5">{data.author.displayName}</Typography>
                                {
                                    data.author.bio && <Typography color='textSecondary'>{data.author.bio}</Typography>
                                }
                                
                            </Stack>
                            <Box ml='auto' marginY={data.author.bio ? 0 : 'auto'}>
                                <SubscribeButton 
                                    isSubscribed={true} 
                                    handleSubscribe={()=>handleSubscribe(data.author.id, data.author.name)} 
                                    handleUnsubscribe={()=>handleUnSubscribe(data.subscription.id, data.author.id, data.author.name)}/>
                            </Box>
                        </Box>
                    ))
                ))
            }
        </Stack>
    )
}

export default ProfileFollowing