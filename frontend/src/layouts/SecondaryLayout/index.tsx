'use client'
import { useMatchMedia } from '@/utils/useMatchMedia';
import { Box, Divider } from '@mui/material';
import { ReactNode } from 'react';

function SecondLayout({leftSection, rightSection}:{leftSection: ReactNode, rightSection: ReactNode}){
    const matchMedia = useMatchMedia()
    return(
        <Box sx={{
            mx: 'auto',
            display: 'grid',
            gridTemplateColumns: {
                xs: '1fr',
                sm: '5fr 1px 2fr'
            },
            gap: "2em",
            }}> 
            <Box marginRight= {matchMedia === "mobile" ? 0 : "2em"} paddingTop= {matchMedia === "mobile" ? 0 : "3em"}>
                {leftSection}
            </Box>
            <Box
                sx={{
                    width: '1px',
                    backgroundColor: 'divider',
                    height: '100%',
                }}
            />
            {matchMedia !== "mobile" &&  
                <Box sx={{
                    maxHeight: '100vh',
                    position: 'sticky',
                    overflow: 'auto',
                    paddingTop: "2em",
                    top: 8
                    }} >
                    {rightSection}
                </Box>
            }
        </Box>
    )
}

export default SecondLayout;