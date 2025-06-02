import ProfileImage from "@/components/ProfileImage";
import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Modal, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import { useEditProfileForm } from "../../hooks/edit-profile-form";
import { useGetSelfQuery } from "@/utils/hooks/user/query";

type ProfileEditModalProps = {
    open: boolean;
    onClose: () => void
}

function ProfileEditModal({open, onClose}:ProfileEditModalProps){
    const {data: self} = useGetSelfQuery()
    const imageRef = useRef<HTMLInputElement>(null)
    const [previewImage, setPreviewImage] = useState<string>('')
    const {editProfileForm, dispatchEditProfileForm, editProfileErrors, onSubmit} = useEditProfileForm()

    const handleFileTrigger = () => {
        if(imageRef.current){
            imageRef.current.click()
        }
    }

    const handleFileSelect = (event: any) => {
        const selectedFile = event.target.files?.[0]
        if(!selectedFile) return

        if(previewImage){
            URL.revokeObjectURL(previewImage)
        }
        dispatchEditProfileForm({type: 'profileImage', payload: selectedFile})
        setPreviewImage(URL.createObjectURL(selectedFile))
    }

    const handleSave = () => {
        const submitted = onSubmit()
        if (submitted){
            onClose()
        }
    }
    
    useEffect(() => {
        if(self){
            const {profileImage, ...data} = self
            if(profileImage){
                setPreviewImage(profileImage)
            }
            dispatchEditProfileForm({type: 'initialize', payload: {...data, profileImage: undefined}})
        }
    }, [self])

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

                <Box sx={{ display: 'flex', gap:2}}>
                    <ProfileImage size='large' path={previewImage ? previewImage : ''} alt=''/>
                    <Stack sx={{ justifyContent: 'space-between'}}>
                        <Box display='flex' gap={2}>
                            <Typography variant="body1" onClick={handleFileTrigger} sx={{cursor: 'pointer'}}>Change</Typography>
                            <Typography variant="body1" color="error" onClick={() => {}} sx={{cursor: 'pointer'}}>Remove</Typography>
                        </Box>
                        <Typography variant='body2'>推奨 : 各辺が少なくとも1,000ピクセルの正方形の JPG, PNG または GIF</Typography>
                    </Stack>
                </Box>
                 <FormControl>
                    <input type='file' className='hidden' ref={imageRef} onChange={(event)=>handleFileSelect(event)}/>
                    { editProfileErrors?.profileImage && 
                        <FormHelperText color='red'>
                            {editProfileErrors.profileImage}
                        </FormHelperText>
                    }
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='name'>Name</FormLabel>
                    <TextField
                        id = 'name'
                        placeholder = 'Tanaka Okada'
                        value = {editProfileForm.name}
                        onChange ={(e)=>dispatchEditProfileForm({type: 'name', payload: e.target.value})}
                        fullWidth
                        size = 'small'
                    />
                    { editProfileErrors?.name && 
                        <FormHelperText color='red'>
                            {editProfileErrors.name}
                        </FormHelperText>
                    }
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='bio'>Short bio</FormLabel>
                    <TextField
                        id = 'bio'
                        value = {editProfileForm.bio ? editProfileForm.bio : ''}
                        onChange ={(e)=>dispatchEditProfileForm({type: 'bio', payload: e.target.value})}
                        fullWidth
                        multiline
                        rows={4} 
                        size='small'
                    />
                    { editProfileErrors?.bio && 
                        <FormHelperText color='red'>
                            {editProfileErrors.bio}
                        </FormHelperText>
                    }
                </FormControl>
                <Box sx={{
                        display: 'flex',
                        gap: 2, 
                        ml: 'auto',
                        mt: 'auto',
                    }}>
                        <Button variant="outlined" onClick={onClose}>Cancel</Button>
                        <Button variant="contained" onClick={handleSave}>Save</Button>
                    </Box>
            </Stack>
        </Modal>
    )
}

export default ProfileEditModal