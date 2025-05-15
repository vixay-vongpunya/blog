import ProfileImage from "@/components/ProfileImage";
import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Modal, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import { useAccountUpdateMutation } from "../../hooks/query";

type ProfileEditModalProps = {
    open: boolean;
    onClose: () => void
}

function ProfileEditModal({open, onClose}:ProfileEditModalProps){
    const {mutate: update} = useAccountUpdateMutation()
    const imageRef = useRef<HTMLInputElement>(null)
    const [image, setImage] = useState<File | null>(null)
    const [previewImage, setPreviewImage] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [bio, setBio] = useState<string>('')

    const handleFileTrigger = () => {
        if(imageRef.current){
            imageRef.current.click()
        }
    }

    const handleFileSelect = (event:any) => {
        const selectedFile = event.target.files?.[0]
        setImage(selectedFile)
        setPreviewImage(URL.createObjectURL(selectedFile))
    }

    useEffect(()=>{
        //url object is remaint in memory so need to clean up
        if(previewImage){
            URL.revokeObjectURL(previewImage)
        }
    },[previewImage])

    const handleSave = () => {
        if(!image || !['image/jpeg', 'image/jpg', 'image/png'].includes(image?.type)){

        }

        const formData = new FormData()
        formData.append('name', name)
        formData.append('bio', bio)
        if(image){
            formData.append('image', image)
        }
        update(formData)

    }
    return(
        <Modal open={open} onClose={onClose}
            sx={{
                display:'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Stack sx={{
                width: '500px',
                padding: '2em',
                gap:4, 
                backgroundColor: 'background.default'}}>

                <Box sx={{
                    display: 'flex',
                    gap:2,

                }}>
                    <ProfileImage size={74} path={previewImage ? previewImage : null} alt=''/>
                    <Stack sx={{
                        justifyContent: 'space-between',
                    }}>
                        <Box display='flex' gap={2}>
                            <Typography variant="body1" onClick={handleFileTrigger} sx={{cursor: 'pointer'}}>Change</Typography>
                            <Typography variant="body1" color="error" onClick={() => setImage(null)} sx={{cursor: 'pointer'}}>Remove</Typography>
                        </Box>
                        <Typography variant='body2'>Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.</Typography>
                    </Stack>
                </Box>
                 <FormControl>
                    <Input type='file' sx={{display: 'none'}} ref={imageRef} onChange={handleFileSelect}/>
                    <FormHelperText color='red'>
                        there is error
                    </FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='name'>Name</FormLabel>
                    <TextField
                        id = 'name'
                        placeholder = '@email.com'
                        autoComplete='email'
                        value = {name}
                        onChange ={(e)=>{setName(e.target.value)}}
                        fullWidth
                        size='small'
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='bio'>Short bio</FormLabel>
                    <TextField
                        id = 'bio'
                        value = {bio}
                        onChange ={(e)=>{setBio(e.target.value)}}
                        fullWidth
                        minRows={4}
                        size='small'
                    />
                </FormControl>
                <Box sx={{
                        display: 'flex',
                        gap: 2, 
                        ml: 'auto',
                        mt: 'auto',
                    }}>
                        <Button variant="outlined" onClick={onClose}>Cancel</Button>
                        <Button variant="contained" onClick={()=>{}}>Save</Button>
                    </Box>
            </Stack>
        </Modal>
    )
}

export default ProfileEditModal