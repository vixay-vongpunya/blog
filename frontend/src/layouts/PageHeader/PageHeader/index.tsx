'use client'
import { useRouter } from "next/navigation";
import { Button} from '@mui/material';
import SearchBar from "@/common/SearchBar";
import TopRight from "../TopRight";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import PageHeaderBaseCard from "../PageHeaderBaseCard";
import { KeyboardEvent } from "react";

function PageHeader(){
    const router = useRouter();
    const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
        console.log(event.key)
        if(event.key === 'Enter'){
            router.push(`${PagePath[Page.Search]}?q=${event.currentTarget.value}&page=${1}&source=post`)
        }
    }
    const element = (
        <Button variant='contained' onClick={()=>{router.push(PagePath[Page.Edit])}}>Edit</Button>         
    )
    const leftSection = (
        <SearchBar onKeyDown={handleSearch}/>
    )

    const rightSection = (
        <TopRight element={element}/> 
    )
    return(
        <PageHeaderBaseCard leftSection={leftSection} rightSection={rightSection}/>
    )
}

export default PageHeader;