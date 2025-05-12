import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { Autocomplete, Box, Button, FormControl, FormHelperText, Input, Modal, Stack, TextField, Typography} from "@mui/material";
import CategoryCard from "@/components/CategoryCard";
import { useGetCategoryQuery } from "@/utils/globalQuery";
import { usePostForm } from "../hooks/edit-post-form";
import { Category } from "@/domains/category/types"
import { useImageInput } from "../hooks/image-manipulation";
import { BlockNoteEditor } from "@blocknote/core";
import { useRef } from "react";

type PublishOptionModalProps = {
    open: boolean,
    onClose: ()=>void,
    editor: BlockNoteEditor,
}

function PublishOptionModal({open, onClose, editor}: PublishOptionModalProps){
    const {data: categories} = useGetCategoryQuery()
    const {postFormValue, dispatchPostFormValue, postFormErrors, onSubmit} = usePostForm()
    const {inputFileRef, previewImage, handleFileChange} = useImageInput(postFormValue.image)

    const handleSelectCategory = (newValue: Category | null) =>{
        // need to make it clear when selecting new value
        if(newValue){
            dispatchPostFormValue({type:'category', payload:[...postFormValue.category, newValue]})
        }   
    }

    const handleRemoveCategory = (index: number) => {
        const temp = postFormValue.category.filter((_:any, i: number)=>i!==index)
        dispatchPostFormValue({type:'category', payload:temp})
    }

    //button trigger input
    const handleFileTrigger = () => {
        if(inputFileRef.current){
            inputFileRef.current.click()
        }
    }

    const handleFileSelect = (event: any) => {
        const image = event.target.files?.[0]
        handleFileChange(image)
        dispatchPostFormValue({type:'image', payload: image})
    }

    const handlePublish = async() => {
        const html = await editor.blocksToHTMLLossy(editor.document)
        onSubmit(html)
    }

    return(
        <Modal open={open} onClose={onClose} 
            sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'background.default'}}>
            <Box sx={{
                height: '80%',
                width: '70%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 6,
                padding: '2em'
            }}>
                <Stack>
                    <Typography variant="h4">Preview Image</Typography>
                    <Box sx={{
                        display: 'flex',
                        backgroundImage: previewImage ? `url(${previewImage})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: 300,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <FormControl>
                            <input ref={inputFileRef} type="file" className='hidden' 
                                onChange={handleFileSelect}/>
                            <Button variant="outlined" onClick={handleFileTrigger}>Select image</Button>
                        </FormControl>
                    </Box>
                    <FormControl>
                        <Input placeholder="Title..." fullWidth sx={{ marginTop: 4}} 
                            onChange={(event)=>dispatchPostFormValue({type:'title', payload: event.target.value })}/>
                        {
                            postFormErrors?.title && (
                                <FormHelperText sx={{color: 'red'}}>{postFormErrors.title}</FormHelperText>
                            )
                        }
                    </FormControl>
                    
                </Stack>
                <Stack gap={2}>
                    <Typography variant='h4'>
                        Category
                    </Typography>
                    <Typography>
                        Add categories to your post, so others can find your post more easily
                    </Typography>
                    <Autocomplete
                        options={categories ? categories : []}
                        getOptionLabel={(option:Category) => option.name}
                        onChange={(event, newValue) => handleSelectCategory(newValue)}
                        renderInput={(params) => (
                            <TextField {...params} 
                                error={!!postFormErrors?.category}
                                helperText={postFormErrors?.category}/>
                        )}
                    />
                    <Box sx={{display: 'flex', gap:1, marginLeft: '1em', flexWrap: 'wrap'}}>
                    {/* need to handle doubble click */}
                    {postFormValue.category.map((item, index)=>(
                        <CategoryCard
                            key={index} 
                            name={item.name}
                            onClick={()=>handleRemoveCategory(index)}/>
                        ))}
                        <Typography>
                            {postFormErrors?.category} 
                            {postFormErrors?.image}
                            {postFormErrors?.title}
                        </Typography>
                    </Box> 
                    <Box sx={{
                        display: 'flex',
                        gap: 2, 
                        ml: 'auto',
                        mt: 'auto',
                    }}>
                        <Button variant="outlined" onClick={onClose}>Back</Button>
                        <Button variant="contained" onClick={handlePublish}>Publish</Button>
                    </Box>
                </Stack> 
            </Box> 
        </Modal>
    )
}

export default PublishOptionModal