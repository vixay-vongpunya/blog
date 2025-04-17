import { SearchIcon } from "@/components/Icons/CustomIcons";
import { gray } from "@/providers/theme/themePrimitives";
import { Stack, TextField } from "@mui/material";

function SearchBar(){
    return(

            <Stack
                direction= 'row'
                sx={{    
                    borderRadius: 2,
                    padding: '0.4em 0.8em',
                    backgroundColor: gray[50],
                    height: '100%',
                    alignItems: 'center',
                    gap: '0.8em'
                }}>
                <SearchIcon/>                   
                <input className=' focus:outline-hidden' placeholder="Search"/>
            </Stack>
    )
}

export default SearchBar;