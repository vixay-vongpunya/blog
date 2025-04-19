import { Box, Button } from '@mui/material';
import { ReactNode } from 'react';

type SecondLayoutProps = {
    leftSection: ReactNode,
    rightSection: ReactNode
}

function SecondLayout({leftSection, rightSection}:SecondLayoutProps){
    
    return(
        <Box sx={{
            mx: "auto",
            maxWidth: "lg",
            display: "grid",
            gridTemplateColumns: "5fr 2fr",
            gap: 4,
            }}> 
            {leftSection}
            <Box sx={{
                paddingLeft: '2em',
                paddingTop: '2em',
                position: "sticky",
                top:0,
                borderLeft: "1px solid #ccc",
                height: 'fit-content'
                }} >
                {rightSection}
            </Box>
        </Box>   
    )
}

export default SecondLayout;