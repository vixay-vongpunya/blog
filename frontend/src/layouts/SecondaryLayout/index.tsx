import { Box } from '@mui/material';
import { ReactNode } from 'react';

function SecondLayout({leftSection, rightSection}:{leftSection: ReactNode, rightSection: ReactNode}){
    return(
        <Box sx={{
            mx: 'auto',
            maxWidth: 'lg',
            display: 'grid',
            gridTemplateColumns: '5fr 2fr',
            gap: 4,
            }}> 
            {leftSection}
            <Box sx={{
                height: '100vh',
                paddingLeft: '2em',
                paddingTop: '2em',
                position: 'sticky',
                overflow: 'hidden',
                top:0,
                borderLeft: '1px solid #ccc',
                }} >
                {rightSection}
            </Box>
        </Box>
    )
}

export default SecondLayout;