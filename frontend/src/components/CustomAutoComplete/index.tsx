import { Box, List, ListItem, TextField, useAutocomplete } from "@mui/material"

type CustomAutocompleteProps = {
    options: {
        id: string,
        name: string,
    }[]
}

function CustomAutocomplete({options}: CustomAutocompleteProps){
    const {getRootProps, getInputProps, getListboxProps, groupedOptions, getOptionProps, inputValue, setAnchorEl} = useAutocomplete({
        options,
        getOptionLabel: option => option.name
    })
    return(
        <Box {...getRootProps()}>
            <TextField inputProps={getInputProps()}
                label='Search Category'
                inputRef={setAnchorEl}/>
            <List {...getListboxProps()}>
                {groupedOptions.map((option, index)=>(
                    <ListItem {...getOptionProps({option, index})} key={index}>
                        {option.name}
                    </ListItem>             
                ))}
            </List>
        </Box>
    )
}

export default CustomAutocomplete