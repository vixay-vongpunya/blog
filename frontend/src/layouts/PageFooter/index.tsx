import { useRouter } from "next/navigation";
import { navRoutes } from "../hooks/NavRoutes";
import {Button, Typography} from '@mui/material';

function PageFooter(){
    const route = useRouter();
    return(
        <nav className="flex justify-center py-4 border-t border-gray-200">
            <ul className="flex justify-center gap-12">
            {navRoutes.map(({key, name, path})=>(
                <li className="cursor-pointer flex items-center" 
                    key={key} 
                    onClick={()=>route.push(path)}>
                    <Typography variant="body2" sx={{color: "lightgray" }}>
                        {name}
                    </Typography>
                </li>              
            ))}
            </ul>
           
        </nav>
    )
}

export default PageFooter;