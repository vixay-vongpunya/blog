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
import { useShowNavBar } from "@/utils/useShowNavBar";

const tabs = ["Posts", "Following"]

type ProfileCardProps = {
    userName: string
}

function ProfileCard({userName}: ProfileCardProps){
    const router = useRouter()
    const showNav = useShowNavBar()
    const screen = useScreenSize()
    const searchParams = useSearchParams()
    const source = searchParams.get("source")

    const handleTab = (event: React.SyntheticEvent, newValue: number) => {
        router.replace(`${PagePath[Page.Profile]}/${userName}?source=${tabs[newValue]}`)
    }

    const tabBar = (
        <Tabs 
            sx={{
                position: 'sticky', 
                top: showNav ? "60px" : 0, 
                marginBottom: "2em", 
                backgroundColor: "background.default", 
                zIndex: 2,
                transition: "0.3s top ease-in"}}
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
                leftSection={<Box>
                    {tabBar}
                    {tabContent}
                </Box>}
            />
    )
}

export default ProfileCard;