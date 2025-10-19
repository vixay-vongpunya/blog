'use client'

import { useMatchMedia } from "@/utils/useMatchMedia";
import { Box } from "@mui/material";
import ProfileDetail from "@/features/profile/components/ProfileDetail";
import SecondLayout from "@/layouts/SecondaryLayout";
import { useSearchParams } from "next/navigation";
import ProfilePostList from "../ProfilePostList";
import ProfileFollowing from "../ProfileFollowing";
import { TabBar } from "@/components/TabBar";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import { useSyncedScroll } from "@/features/home/hooks/syncScroll";

type ProfileCardProps = {
    userName: string
}

function ProfileCard({userName}: ProfileCardProps){
    const matchMedia = useMatchMedia()
    const searchParams = useSearchParams()
    const source = searchParams.get("source") as string

    const {rightRef: rightScrollRef, leftRef: leftScrollRef} = useSyncedScroll()

    const tabs = [{
            source: 'Posts',
            content: <ProfilePostList userName={userName}/>
        },
        {
            source: 'Saved',
            content:<></>
        },
        {
            source: 'Following',
            content: <ProfileFollowing userName={userName}/>
        }
    ]
    
    return(
        matchMedia === 'mobile' ?
            <Box display= 'flex' flexDirection= 'column' gap= '1em'>
                <ProfileDetail userName={userName}/>
                <TabBar page={PagePath[Page.Profile]+`/${userName}`} currentSource={source} tabs={tabs}/>
            </Box> : 
            <SecondLayout 
                rightScrollRef={rightScrollRef}
                leftScrollRef={leftScrollRef}
                rightSection={<ProfileDetail userName={userName}/>} 
                leftSection={<TabBar page={PagePath[Page.Profile]+`/${userName}`} currentSource={source} tabs={tabs}/>}
            />
    )
}

export default ProfileCard;