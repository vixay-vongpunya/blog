import { Box } from '@mui/material';
import { ReactNode } from 'react';

function SecondLayout({children}:{children: ReactNode}){
    
    return(
        <Box sx={{
            mx: 'auto',
            maxWidth:'lg',
            paddingX: '8em',
            paddingTop: '2em',
            marginBottom: '4em'
            }}>
                {children}
        </Box>
    )
}

export default SecondLayout;