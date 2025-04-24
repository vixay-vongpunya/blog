import { SearchIcon } from "@/components/Icons/CustomIcons";
import { category } from "@/data/post";
import { gray } from "@/providers/theme/themePrimitives";
import { Button, Stack, TextField } from "@mui/material";

function SearchBar(){
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
            <input className=' focus:outline-hidden' placeholder="Search"/>
        </Stack>
    )
}

export default SearchBar;