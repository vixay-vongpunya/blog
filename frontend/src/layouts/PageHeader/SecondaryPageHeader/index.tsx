import { Box, Button } from '@mui/material';
import { ReactNode } from 'react';
import TopRight from '../TopRight';
import PageHeaderBaseCard from '../PageHeaderBaseCard';

function SecondaryPageHeader(){


    const element = (
        <Button variant='contained' onClick={()=>{}}>publish</Button>
    )

    const rightSection = (
        <TopRight element={element}/>
    )
    return(
        <PageHeaderBaseCard rightSection={rightSection} />
    )
}

export default SecondaryPageHeader;