'use client'

import { useScreenSize } from "@/utils/useScreenSize";
import { Box, Tab, Tabs } from "@mui/material";
import ProfileDetail from "@/features/profile/components/ProfileDetail";
import SecondLayout from "@/layouts/SecondaryLayout";
import { useRouter, useSearchParams } from "next/navigation";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import ProfilePostList from "../ProfilePostList";
import ProfileFollowing from "../ProfileFollowing";
import { useMemo } from "react";

const tabs = ["Posts", "Following"]

type ProfileCardProps = {
    userName: string
}

function ProfileCard({userName}: ProfileCardProps){
    const router = useRouter()
    const screen = useScreenSize()
    const searchParams = useSearchParams()
    const source = searchParams.get("source")

    const handleTab = (event: React.SyntheticEvent, newValue: number) => {
        router.replace(`${PagePath[Page.Profile]}/${userName}?source=${tabs[newValue].toLowerCase()}`)
    }

    const tabBar = (
        <Tabs 
            sx={{
                position: 'relative', 
                marginBottom: '2em', 
                backgroundColor: 'background.default', 
                borderBottom: 2, 
                borderColor: 'divider',
            }}
            value={tabs.findIndex(item=>item.toLowerCase() === source?.toLocaleLowerCase())} 
            onChange={handleTab}
            indicatorColor="primary"
            textColor="primary">
            {
                tabs.map((tab, index)=>(
                    <Tab key={index} label={tab} sx={{textTransform: 'none'}}/>
                ))
            }
        </Tabs>
    )

    const tabContent = useMemo(() =>{
        switch(source?.toLowerCase()){
            case "posts":
                return <ProfilePostList userName={userName}/>
            case "following":
                return <ProfileFollowing userName={userName}/>
        }  
    },[source])
   

    return(
        screen === 'mobile' ?
            <Box gap="2em">
                <ProfileDetail userName={userName}/>
                {tabBar}
                {tabContent}
            </Box> : 
            <SecondLayout 
                rightSection={<ProfileDetail userName={userName}/>} 
                leftSection={<Box marginTop='100px'>
                    {tabBar}
                    {tabContent}
                </Box>}
            />
    )
}

export default ProfileCard;