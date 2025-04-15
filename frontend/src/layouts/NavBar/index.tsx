import { useRouter } from "next/navigation";
import { navRoutes } from "../hooks/NavRoutes";
import {Button, Typography} from '@mui/material';
import { Page, PagePath } from "@/providers/PageProviders/hook";

function NavBar(){
    const route = useRouter();
    return(
        <nav className="flex justify-between px-6 py-4 bg-white/50 shadow-sm mb-6 sticky z-50 top-0 backdrop-blur-md">
            <div>
                <Typography>My Blog</Typography>
            </div>
            <ul className="flex justify-center gap-12">
            {navRoutes.map(({key, name, path})=>(
                <li className="cursor-pointer flex items-center" 
                    key={key} 
                    onClick={()=>route.push(path)}>
                    <Typography className="font-semibold">
                        {name}
                    </Typography>
                </li>              
            ))}
            </ul>
            <div className="flex gap-1">
                <Button variant="contained" onClick={()=>{route.push(PagePath[Page.SignUp])}}>Login</Button>
                <Button variant="outlined" onClick={()=>{route.push(PagePath[Page.SignUp])}}>Sign Up</Button>
            </div>
        </nav>
    )
}

export default NavBar;