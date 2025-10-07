'use client'
import { useShowNavBar } from "@/utils/useShowNavBar";
import { Box } from "@mui/material";
import { ReactNode } from "react";

function MainLayout({children}:{children: ReactNode}){
    const showNav = useShowNavBar()
    return(
        <Box sx={{
                mx: "auto",
                maxWidth:"lg",
                marginTop: showNav ? 8 : 0,
                transition: "0.3s margin-top ease-in",
                paddingX: {
                    xs: '1.5em',
                    sm: '2em',
                    md: '4em'},
                }}>
                    {children}
        </Box>
    )
}

export default MainLayout;