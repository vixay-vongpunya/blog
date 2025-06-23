import { SearchIcon, SemanticSearchIcon } from "@/components/Icons/CustomIcons";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import { Stack, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyboardEvent } from "react";


function SearchBar({fullWidth = false}: {fullWidth?: boolean}){
    const router = useRouter()
    const searchParams = useSearchParams()
    const query = searchParams.get('q')?.toString()
    const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            router.push(`${PagePath[Page.Search]}?q=${event.currentTarget.value}&display=pagination&page=${1}&source=post`)
        }
    }
    return(
        <Stack
            direction= 'row'
            sx={{    
                borderRadius: 2,
                padding: '0.5em 0.8em',
                backgroundColor: 'background.secondary',
                height: '100%',
                alignItems: 'center',
                gap: '0.8em',
                width: fullWidth ? '100%' : '250px',
            }}>
                <SearchIcon/>                               
            <input className=' focus:outline-hidden' 
                placeholder="Search" 
                onKeyDown={handleSearch}
                defaultValue={query}/>
        </Stack>
    )
}

export default SearchBar;