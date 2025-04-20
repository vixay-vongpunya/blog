import { Box, Button } from '@mui/material';
import { ReactNode } from 'react';
import TopRight from '../TopRight';
import PageHeaderBaseCard from '../PageHeaderBaseCard';

function SecondaryPageHeader({handleClick}:{handleClick: ()=>void}){


    const element = (
        <Button variant='contained' onClick={handleClick}>publish</Button>
    )

    const rightSection = (
        <TopRight element={element}/>
    )
    return(
        <PageHeaderBaseCard rightSection={rightSection} />
    )
}

export default SecondaryPageHeader;