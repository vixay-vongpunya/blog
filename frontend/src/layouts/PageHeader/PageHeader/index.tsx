'use client'
import { useRouter } from "next/navigation";
import { navRoutes } from "../../hooks/NavRoutes";
import { AppBar, Button, MenuItem, Select, Stack, Switch, Toolbar, Typography, useColorScheme} from '@mui/material';
import SearchBar from "@/common/SearchBar";
import TopRight from "../TopRight";
import { useState } from "react";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import PageHeaderBaseCard from "../PageHeaderBaseCard";


function PageHeader(){
    const router = useRouter();
    const element = (
        <Button variant='contained' onClick={()=>{router.push(PagePath[Page.Edit])}}>Edit</Button>
        // <>
        // {authenticated ? (
        //     <Button variant='contained' onClick={()=>{router.push(PagePath[Page.Edit])}}>Edit</Button>
        // ):(
        //     <>
        //       <Button variant="contained" onClick={()=>{router.push(PagePath[Page.Login])}}>Log in</Button>
        //       <Button variant="outlined" onClick={()=>{router.push(PagePath[Page.SignUp])}}>Sign Up</Button>
        //     </>
        //       )
        //   }
        // </>
         
    )
    const leftSection = (
        <SearchBar/>
    )

    const rightSection = (
        <TopRight element={element}/> 
    )
    return(
        <PageHeaderBaseCard leftSection={leftSection} rightSection={rightSection}/>
    )
}

export default PageHeader;