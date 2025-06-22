'use client'

import { Box, Button, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useGetAccount, useGetUserSubscriptionFollowingQuery, useGetUserSubscriptionQuery} from "../../hooks/query";
import { useState } from "react";
import ProfileEditModal from "../ProfileEditModel";
import ProfileImage from "@/components/ProfileImage";
import { useGetSelfQuery, useUserSubscriptionMutation, useDeleteUserSubscriptionMutation } from "@/utils/hooks/user/query";
import { RoundButton, SubscribeButton } from "@/components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import { useScreenSize } from "@/utils/useScreenSize";

type ProfileDetailProps = {
    userName: string
}
// this profile can be used for both logged in user and friend profile
// for user: edit profile
// for friend: follow button
function ProfileDetail({userName}: ProfileDetailProps){
    const router = useRouter()
    const screen = useScreenSize()
    
    const [editOpen, setEditOpen] = useState<boolean>(false)
    const {data: self} = useGetSelfQuery()
    const {data: user} = useGetAccount(userName)
    const isSelf = self?.name === userName

    // this query is only for when it is not the logged in user
    // dependent query, so i check at useQuery
    const {data: userSubscription} = useGetUserSubscriptionQuery(user?.id, !isSelf)

    //common
    const {data: followingUsers} = useGetUserSubscriptionFollowingQuery(user?.id)
    const {mutate: userSubscriptionMutate} = useUserSubscriptionMutation()
    const {mutate: deleteUserSubscriptionMutate} = useDeleteUserSubscriptionMutation()

    const handleFollow = () =>{
        if (!user) return
        if(userSubscription.subscription.id){
            const data = {
                subscriptionId: userSubscription.subscription.id,
                authorId: user?.id,
                userName: userName
            }
            deleteUserSubscriptionMutate(data)
        }
        else{
            const data = {
                authorId: user.id,
                userName: userName,
            }
            userSubscriptionMutate(data)
        }
    }

    return(
        <Stack sx={{ gap: '1.5em', 
            paddingTop: {
                xs: '1em',
                sm: '2em',
                dm: '4em'
            }}}>
            <ProfileEditModal open={editOpen} onClose={() => setEditOpen(false)}/>
            <Stack sx={{
                flexDirection:{
                    xs: "row",
                    sm: "column",
                },
                gap: "1em"
            }}>
                <ProfileImage size='large' path={self?.profileImage} alt={user?.name}/>
                <Stack sx={{ gap:'1em',justifyContent: 'center' }}>
                    <Typography variant="h4" 
                        sx={{fontWeight: "bold",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            WebkitLineClamp: 1,
                        }} >{user?.name}</Typography>
                    <Typography variant='body2' color='text.secondary'>
                        {user?.subscription?.followerCount} followers &middot; 
                        {user?.subscription?.followingCount} following
                    </Typography>

                </Stack> 
            </Stack>
            {/* to prevent gap here when there is no bio */}
            { self?.bio && <Typography>{self?.bio}</Typography>}
            
            { isSelf ? 
                <RoundButton fullWidth={screen === "mobile"} text="Edit profile" onClick={() => setEditOpen(true)}/>
                :
                <SubscribeButton isSubscribed={!!userSubscription?.subscription.id} handleSubscribe={handleFollow} handleUnsubscribe={handleFollow}/>
            }
            {(followingUsers?.pages[0].length > 0 && screen !== "mobile") && 
                <Stack marginTop={4} gap={2}>
                    <Typography variant='h5'>Following</Typography>
                    <Stack gap={1} >
                        {followingUsers?.pages[0].slice(0,4).map(({author}: any, index:number)=>(
                            <Box key={index} sx={{display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer'}}
                                onClick={()=>router.push(`${PagePath[Page.Profile]}/${author.name}`)}>
                                <ProfileImage size='small' path={author.profileImage} alt={author.name}/>
                                <Typography>{author.name}</Typography>
                            </Box>
                        ))}
                    </Stack>
                    {
                        followingUsers?.pages[0].length > 4 && <RoundButton text='see all' onClick={()=>{}}/>
                    }
                    
                </Stack>
            }
        </Stack>
    )
}

export default ProfileDetail;