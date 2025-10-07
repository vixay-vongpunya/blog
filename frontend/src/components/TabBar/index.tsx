import { Box, Tab, Tabs } from "@mui/material"
import { useRouter } from "next/navigation"
import { ReactNode} from "react";

type TabBarProps = {
    page: string;
    currentSource: string;
    tabs: {
        source: string,
        content: ReactNode
    }[];
}

export function TabBar({page, currentSource, tabs}: TabBarProps){
    const router = useRouter()
    const currentIndex = tabs.findIndex(item=>item.source.toLowerCase() === currentSource.toLowerCase())
    const handleTab = (event: React.SyntheticEvent, newValue: number) => {
        console.log(`${page}?source=${tabs[newValue].source.toLowerCase()}`)
        router.replace(`${page}?source=${tabs[newValue].source.toLowerCase()}`)
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
            value={tabs.findIndex(item=>item.source.toLowerCase() === currentSource?.toLowerCase())} 
            onChange={handleTab}
            indicatorColor="primary"
            textColor="primary">
            {
                tabs.map((tab, index)=>(
                    <Tab key={index} label={tab.source} sx={{textTransform: 'none'}}/>
                ))
            }
        </Tabs>
    )

    return(
        <>
            {tabBar}
            <Box sx={{ display:"flex", flexDirection:"column", gap:3, marginTop: 4}}>
                {tabs[currentIndex].content}
            </Box>
        </>
    )
}