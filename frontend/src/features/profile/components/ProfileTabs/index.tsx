import { Page, PagePath } from "@/providers/PageProviders/hook"
import { Tab, Tabs } from "@mui/material"
import { useRouter, useSearchParams } from "next/navigation"

const tabs = ["Posts", "Following", "Saved"]

function ProfileTabs(){
    const router = useRouter()
    const searchParams = useSearchParams()
    const source = searchParams.get("source")

    const handleTab = (event: React.SyntheticEvent, newValue: number) => {
        router.replace(`${PagePath[Page.Home]}?source=${tabs[newValue]}`)
    }

    const tabBar = (
        <Tabs 
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
    return(
        <>
        {tabs}
        </>
    )
}

export default ProfileTabs