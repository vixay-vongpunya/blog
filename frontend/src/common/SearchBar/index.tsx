import { SearchIcon } from "@/components/Icons/CustomIcons";
import { Stack } from "@mui/material";
import { KeyboardEventHandler } from "react";

type SearchBarProps = {
    onKeyDown: KeyboardEventHandler<HTMLInputElement>
}

function SearchBar({onKeyDown}:SearchBarProps){
    return(
        <Stack
            direction= 'row'
            sx={{    
                borderRadius: 2,
                padding: '0.4em 0.8em',
                backgroundColor: 'background.secondary',
                height: '100%',
                alignItems: 'center',
                gap: '0.8em',
                width: '250px',
            }}>
            <SearchIcon/>                   
            <input className=' focus:outline-hidden' placeholder="Search" onKeyDown={onKeyDown}/>
        </Stack>
    )
}

export default SearchBar;