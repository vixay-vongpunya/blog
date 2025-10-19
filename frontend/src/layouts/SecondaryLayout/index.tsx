'use client'
import { useMatchMedia } from '@/utils/useMatchMedia';
import { navBarHeight, useShowNavBar } from '@/utils/useShowNavBar';
import { Box, Divider } from '@mui/material';
import { forwardRef, ReactNode} from 'react';

const SecondLayout = forwardRef(({rightScrollRef, leftScrollRef, leftSection, rightSection}:{rightScrollRef:any, leftScrollRef:any, leftSection: ReactNode, rightSection: ReactNode})=>{
    const matchMedia = useMatchMedia()
    const showNavbar = useShowNavBar()

    return(
        <Box 
            sx={{
            mx: 'auto',
            display: 'grid',
            gridTemplateColumns: {
                xs: '1fr',
                sm: '5fr 1px 2fr'
            },
            gap: "2em",
            
            }}> 
            <Box  ref={leftScrollRef} marginRight= {matchMedia === "mobile" ? 0 : "2em"} paddingTop= {matchMedia === "mobile" ? "1em" : "3em"}
                className="no-scroll-bar"
                sx={{
                    height: '100vh',
                    overflowY: 'auto'
                }}>
                {leftSection}
            </Box>
            <Box
                sx={{
                    width: '1px',
                    backgroundColor: 'divider',
                }}
            />
            {matchMedia !== "mobile" &&  
                <Box
                ref={rightScrollRef}
                className="no-scroll-bar"
                sx={{
                    transition: '0.3s top ease',
                    height: '100vh',
                    overflowY: 'auto',
             
                    paddingTop: "2em",
                    top: showNavbar ? '64px' : 0,
                    }} >
                    {rightSection}
                </Box>
            }
        </Box>
    )
})

export default SecondLayout;

