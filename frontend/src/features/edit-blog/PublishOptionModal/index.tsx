import SearchBar from "@/common/SearchBar";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { Autocomplete, Box, Button, FormControl, FormLabel, Input, Modal, Stack, TextField, Typography, useAutocomplete} from "@mui/material";
import CategoryCard from "@/components/CategoryCard";
import { useGetCategoryQuery } from "@/utils/globalQuery";
import { usePostForm } from "../hooks/edit-post-form";
import { Caesar_Dressing } from "next/font/google";
import CustomAutocomplete from "@/components/CustomAutoComplete";
import { useEffect, useRef, useState } from "react";
import { Category } from "@/domains/category/types";
import { access } from "fs";

type PublishOptionModalProps = {
    open: boolean,
    onClose: ()=>void,
}

function PublishOptionModal({open, onClose}: PublishOptionModalProps){
    const {data: categories} = useGetCategoryQuery()
    const {postFormValue, dispatchPostFormValue,  postFormErrors} = usePostForm()
    const [input, setInput] = useState<Category | null>(null)
    if(!categories){
        return <>loading</>
    }

    const handleSelect = (newValue: Category | null) =>{

        // need to make it clear when selecting new value
        if(newValue){
            console.log("access")
            dispatchPostFormValue({type:'category', payload:[...postFormValue.category, newValue]})
        }   
    }


    const handleRemoveCategory = (index: number) =>{
        const temp = postFormValue.category.filter((_:any, i: number)=>i!==index)
        dispatchPostFormValue({type:'category', payload:temp})
    }

    return(
        <Modal open={open} onClose={onClose} 
            sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box sx={{
                height: '80%',
                width: '70%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                backgroundColor: 'white',
                gap: 6,
                padding: '2em'
            }}>
                <Stack>
                    <Typography variant="h4">Preview Image</Typography>
                    <Box sx={{
                        display: 'flex',
                        backgroundImage: `url(./../person.jpg)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: 300,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Button variant="outlined">Select image</Button>
                    </Box>

                    <Input placeholder="Title..." fullWidth sx={{ marginTop: 4}}/>
                </Stack>
                <Stack gap={2}>
                    <Typography variant='h4'>
                        Category
                    </Typography>
                    <Typography>Add categories to your post, so others can find your post more easily</Typography>
                    <Stack>
                    <Autocomplete
                        options={categories}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) => handleSelect(newValue)}
                        value={input}
                        renderInput={(params) => (
                            <TextField {...params} label="Select Category"/>
                        )}
                        />
                    </Stack>
                    <Box sx={{display: 'flex', gap:1, marginLeft: '1em', flexWrap: 'wrap'}}>
                    {/* need to handle doubble click */}
                    {postFormValue.category.map((item, index)=>(
                        <CategoryCard
                            key={index} 
                            name={item.name}
                            onClick={()=>handleRemoveCategory(index)}/>
                        ))}
                    </Box> 
                    <Box sx={{
                        display: 'flex',
                        gap: 2, 
                        ml: 'auto',
                        mt: 'auto',
                    }}>
                        <Button variant="outlined">Back</Button>
                        <Button variant="contained">Publish</Button>
                    </Box>
                </Stack> 
            </Box> 
        </Modal>
        
    )
}

export default PublishOptionModal