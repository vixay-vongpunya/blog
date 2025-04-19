import { Page, PagePath } from "@/providers/PageProviders/hook";
import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type PageHeaderBaseCardProps = {
    rightSection?: ReactNode,
    leftSection?: ReactNode
}

function PageHeaderBaseCard({rightSection, leftSection}:PageHeaderBaseCardProps){
    const router = useRouter()
    return(
        <AppBar position='relative'
            color="transparent"
            elevation={0}
            sx={{
                px: 1.5,
                backdropFilter: 'blur(10px)',
                zIndex: 30,
            }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
                <Stack direction='row' sx={{gap:2, alignItems: 'center'}}>
                    <Typography sx={{
                        flexShrink: 0,
                        cursor: 'pointer'}}
                        onClick={()=>router.push(PagePath[Page.Home])}>My Blog</Typography>
                        {leftSection}
                </Stack> 
                {rightSection}
            </Toolbar>
        </AppBar>
    )
}

export default PageHeaderBaseCard;