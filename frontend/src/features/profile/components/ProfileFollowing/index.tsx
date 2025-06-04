'use client'
import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material"
import { useGetAccount, useGetUserSubscriptionFollowingQuery } from "../../hooks/query"
import ProfileImage from "@/components/ProfileImage"
import { SubscribeButton } from "@/components/Button"
import { Page, PagePath } from "@/providers/PageProviders/hook"
import { useRouter } from "next/navigation"

type ProfileFollowingProps = {
    userName: string
}

function ProfileFollowing({userName}: ProfileFollowingProps){
    const {data: user} = useGetAccount(userName)
    const router = useRouter()
    const {data: followingUsers} = useGetUserSubscriptionFollowingQuery(user?.id)
    return(
        <Stack gap={4}>
            <Breadcrumbs separator='>'>
            <Typography color='primary' sx={{cursor: 'pointer', '&:hover': {textDecoration: 'underline'}}} onClick={()=>router.push(`${PagePath[Page.Profile]}/${userName}`, { shallow: true } as any)}>
                {user?.name}
            </Typography>
            <Typography>following</Typography>
            </Breadcrumbs>
            <Typography variant="h4">Following</Typography>
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