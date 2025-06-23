'use client'

import { useSearchParams } from "next/navigation"
import SearchResult from "../SearchResult"
import SearchBar from "@/components/SearchBar"
import { Stack, Typography } from "@mui/material"
import { useMatchMedia } from "@/utils/useMatchMedia"

function SearchPanel(){
    const matchMedia = useMatchMedia()
    const searchParams = useSearchParams()
    const query = searchParams.get('q') as string

    if(query){
        return <SearchResult/>
    }
    console.log("search")

    return (
        <Stack gap="2em"> 
            {matchMedia === "mobile" && <SearchBar fullWidth={true}/>}
            
            <Typography variant="h4">Recent Search</Typography>
            <Stack>
                data
            </Stack>

        </Stack>)
}

export default SearchPanel