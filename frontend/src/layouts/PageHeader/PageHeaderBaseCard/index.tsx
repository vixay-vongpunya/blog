
import { Page, PagePath } from "@/providers/PageProviders/hook";
import { navBarHeight, useShowNavBar } from "@/utils/useShowNavBar";
import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

type PageHeaderBaseCardProps = {
    rightSection?: ReactNode,
    leftSection?: ReactNode
}

function PageHeaderBaseCard({rightSection, leftSection}:PageHeaderBaseCardProps){
    const router = useRouter()
    const showNav = useShowNavBar()

    return(
        <AppBar 
            elevation={0}
            color='transparent'
            sx={{
                position: "fixed",
                top: showNav ? 0: `-${navBarHeight}`,
                px: 1.5,
                zIndex: 10,
                transition: "0.3s top ease-in",
                borderBottom: '1px solid',
                backgroundColor: 'background.default',
                borderColor: 'divider'
            }}>
                {/* height default for toobar is 64px for laptop */}
            <Toolbar sx={{ display: 'flex', height: `${navBarHeight}`}}>
                <Stack direction='row' sx={{gap:2, alignItems: 'center', flex:1}}>
                    <Typography sx={{
                        flexShrink: 0,
                        cursor: 'pointer'}}
                        onClick={()=>router.push(`${PagePath[Page.Home]}?source=feed`)}>My Blog</Typography>
                        {leftSection}
                </Stack> 
                {rightSection}
            </Toolbar>
        </AppBar>
    )
}

export default PageHeaderBaseCard;