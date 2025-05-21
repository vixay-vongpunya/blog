import { SearchIcon } from "@/components/Icons/CustomIcons";
import { Stack } from "@mui/material";
import { KeyboardEventHandler } from "react";

type SearchBarProps = {
    onKeyDown: KeyboardEventHandler<HTMLInputElement>;
    defaultValue: string | undefined;
}

function SearchBar({onKeyDown, defaultValue}:SearchBarProps){
    
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
            <input className=' focus:outline-hidden' 
                placeholder="Search" 
                onKeyDown={onKeyDown}
                defaultValue={defaultValue}/>
        </Stack>
    )
}

export default SearchBar;