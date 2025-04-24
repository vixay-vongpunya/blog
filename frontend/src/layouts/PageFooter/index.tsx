'use client'
import { useRouter } from "next/navigation";
import { navRoutes } from "../hooks/NavRoutes";
import {Button, Stack, Typography} from '@mui/material';

function PageFooter(){
    const route = useRouter();
    return(
        <Stack sx={{py: '5em'}}>
            <ul className="flex justify-center gap-12">
            {navRoutes.map(({key, name, path})=>(
                <li className="cursor-pointer flex items-center" 
                    key={key} 
                    onClick={()=>route.push(path)}>
                    <Typography variant="body2" sx={{color: "text.secondary" }}>
                        {name}
                    </Typography>
                </li>              
            ))}
            </ul>
        </Stack>
    )
}

export default PageFooter;