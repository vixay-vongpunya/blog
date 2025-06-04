'use client'

import { Box, Button, Stack, Typography } from "@mui/material";
import { useDeleteUserSubscriptionMutation, useGetAccount, useGetUserSubscriptionFollowingQuery, useGetUserSubscriptionQuery} from "../../hooks/query";
import { useState } from "react";
import ProfileEditModal from "../ProfileEditModel";
import ProfileImage from "@/components/ProfileImage";
import { useGetSelfQuery, useUserSubscriptionMutation } from "@/utils/hooks/user/query";
import { RoundButton, SubscribeButton } from "@/components/Button";

type ProfileDetailProps = {
    userName: string
}

// this profile can be used for both logged in user and friend profile
// for user: edit profile
// for friend: follow button
function ProfileDetail({userName}: ProfileDetailProps){
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
                authorId: user?.id
            }
            deleteUserSubscriptionMutate(data)
        }
        else{
            userSubscriptionMutate(user.id)
        }
    }

    console.log("hey", followingUsers?.pages)
    return(
        <Stack sx={{ gap: '1em', paddingTop: '4em'}}>
            <ProfileEditModal open={editOpen} onClose={() => setEditOpen(false)}/>
            <ProfileImage size='large' path={self?.profileImage} alt={user?.name}/>
            <Stack sx={{ gap:'1em' }}>
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
                <Typography>{self?.bio}</Typography>
                { isSelf ? 
                        <Button variant='outlined' sx={{padding: '2px 12px', borderRadius: '99em', width: 'fit-content'}}
                            onClick={() => setEditOpen(true)}>
                            Edit Profile
                        </Button> 
                        :
                        <SubscribeButton isSubscribed={userSubscription?.id} handleSubscribe={handleFollow} handleUnsubscribe={handleFollow}/>
                    }
            </Stack>
            
            <Stack marginTop={4} gap={2}>
                <Typography variant='h5'>Following</Typography>
                <Stack gap={1} >
                    {followingUsers?.pages[0].slice(0,4).map(({author}: any, index:number)=>(
                        <Box key={index} sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                            <ProfileImage size='small' path={author.profileImage} alt={author.name}/>
                            <Typography>{author.name}</Typography>
                        </Box>
                    ))}
                </Stack>
                {
                    followingUsers?.pages[0].length > 4 && <RoundButton text='see all' onClick={()=>{}}/>
                }
                
            </Stack>
        </Stack>
    )
}

export default ProfileDetail;