import { useRouter } from "next/navigation";
import { navRoutes } from "../hooks/NavRoutes";
import {Button, Typography} from '@mui/material';

function NavBar(){
    const route = useRouter();
    return(
        <aside className="fixed">
            <ul className="flex">
            {navRoutes.map(({key, name, path})=>(
                <li key={key}>
                    <Button onClick={()=>route.push(path)}>
                        <Typography>
                            {name}
                        </Typography>
                    </Button>
                </li>              
            ))}
            </ul>
        </aside>
    )
}

export default NavBar;