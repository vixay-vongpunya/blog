'use client'

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { Box, Button, Input, Stack, Typography, useColorScheme} from "@mui/material";
import { BlockNoteView} from "@blocknote/mantine";
import { useState } from "react";
import SecondaryPageHeader from "@/layouts/PageHeader/SecondaryPageHeader";
import { useGetCategoryQuery } from "@/utils/globalQuery";
import PublishOptionModal from "../PublishOptionModal";
import { usePostForm } from "../hooks/edit-post-form";


function EditPanel() {
  const {mode} = useColorScheme()
  const {data: allCategories} = useGetCategoryQuery()
  const { dispatchPostFormValue, onSubmit, editor} = usePostForm()
  const [open, setOpen] = useState(false)
  return (
    <Stack >
      <SecondaryPageHeader handleClick={()=>setOpen(true)}/>
      <PublishOptionModal open={open} onClose={()=>setOpen(false)}/>
      <Box sx={{display: 'flex', alignContent: 'center', paddingBottom: 10}}>
          <Stack sx={{ margin: 'auto', width: '70%', gap:6}}>
              <Box sx={{ display: 'flex', gap: 2}}>
                <Typography variant='h4'>
                  Title
                </Typography>
                <Input placeholder="title" onChange={(event)=>dispatchPostFormValue({type:'title', payload: event.target.value})}/>
              </Box>
            <style>
                  {`
                    .bn-editor {
                      background-color: transparent;
                    }
                  `}
                </style>
            <BlockNoteView editor={editor} theme={mode as 'light' | 'dark'} />  
          </Stack>
      </Box>
    </Stack>
  )
}

export default EditPanel;
 