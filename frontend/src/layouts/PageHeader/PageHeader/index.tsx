import { useRouter } from "next/navigation";
import { navRoutes } from "../../hooks/NavRoutes";
import { AppBar, MenuItem, Select, Stack, Switch, Toolbar, Typography, useColorScheme} from '@mui/material';
import SearchBar from "@/common/SearchBar";
import TopRight from "../TopRight";
import { useState } from "react";

function PageHeader(){
    const route = useRouter();
    return(
        <AppBar position='relative'
            color="transparent"
            elevation={0}
            sx={{
                px: 1.5,
                backdropFilter: 'blur(10px)',
                zIndex: 30,
            }}>
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',

            }}>
                <Stack direction='row' sx={{gap:2, alignItems: 'center'}}>
                    <Typography sx={{flexShrink: 0}}>My Blog</Typography>
                    <SearchBar/>
                </Stack>
                <TopRight/>  
            </Toolbar>
        </AppBar>
    )
}

export default PageHeader;