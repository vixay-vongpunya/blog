'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Button} from '@mui/material';
import SearchBar from "@/components/SearchBar";
import TopRight from "../TopRight";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import PageHeaderBaseCard from "../PageHeaderBaseCard";
import { KeyboardEvent } from "react";
import { useMatchMedia } from "@/utils/useMatchMedia";
import { SearchIcon } from "@/components/Icons/CustomIcons";

function PageHeader(){
    const router = useRouter();
    const matchMedia = useMatchMedia()

    const leftSection = 
        matchMedia === "mobile" ?
            <Box ml="auto" onClick={() => router.push(PagePath[Page.Search])}>
                <SearchIcon/>
            </Box>:
            <SearchBar/>

    const rightSection = (
        <TopRight/> 
    )
    
    return(
        <PageHeaderBaseCard leftSection={leftSection} rightSection={rightSection}/>
    )
}

export default PageHeader;