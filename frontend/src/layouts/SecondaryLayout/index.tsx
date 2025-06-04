import { Box, Divider } from '@mui/material';
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
            <Box sx={{marginTop: '4em', paddingLeft: '8em'}}>
                {leftSection}
            </Box>
            <Box sx={{
                maxHeight: '100vh',
                paddingLeft: '2em',
                paddingTop: '2em',
                position: 'sticky',
                overflow: 'hidden',
                top:0,
                borderLeft: '1px solid divider',
                }} >
                {rightSection}
            </Box>
        </Box>
    )
}

export default SecondLayout;