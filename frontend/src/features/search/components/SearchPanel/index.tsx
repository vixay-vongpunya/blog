'use client'

import { useSearchParams } from "next/navigation"
import SearchResult from "../SearchResult"
import SearchBar from "@/components/SearchBar"
import { ButtonBase, List, ListItem, ListItemText, Stack, Typography } from "@mui/material"
import { useMatchMedia } from "@/utils/useMatchMedia"
import { useSearchHistoryMutation, useSearchHistoryQuery } from "../../hooks/query"
import { DeleteIcon } from "@/components/Icons/CustomIcons"

function SearchPanel(){
    const matchMedia = useMatchMedia()
    const searchParams = useSearchParams()
    const query = searchParams.get('q') as string

    const { data: searchHistory } = useSearchHistoryQuery()
    const { mutate: deleteSearchHistory} = useSearchHistoryMutation()

    return (
        <Stack gap="2em" sx={{mt: {
            xs: "6em",
            sm: "10em"}
            }}> 
        {
            query ?
                <SearchResult/>
            :
            <>
                {matchMedia === "mobile" && <SearchBar fullWidth={true}/>}
                <Typography variant="h2">Recent Searches</Typography>
                <Stack>
                    <List >
                        {
                            searchHistory?.map((item)=>(
                                <ListItem key={item.id} 
                                    secondaryAction={
                                        <ButtonBase onClick={()=>deleteSearchHistory(item.id)}>
                                            <DeleteIcon/>
                                        </ButtonBase>}
                                    sx={{paddingX: 0}}
                                    >
                                    <ListItemText>{item.query}</ListItemText>
                                </ListItem>
                            ))
                        }
                    </List>
                    
                </Stack>
            </>
        }
            
        </Stack>)
}

export default SearchPanel