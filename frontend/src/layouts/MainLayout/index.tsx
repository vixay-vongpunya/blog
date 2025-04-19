import { Box } from "@mui/material";
import { ReactNode } from "react";


function MainLayout({children}:{children: ReactNode}){
    return(
        <Box sx={{
                mx: "auto",
                maxWidth:"lg",
                paddingX: '8em'
                }}>
                    {children}
        </Box>
    )
}

export default MainLayout;