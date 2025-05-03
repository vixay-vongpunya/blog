'use client'

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { Box, Stack, useColorScheme} from "@mui/material";
import { BlockNoteView} from "@blocknote/mantine";
import { useState } from "react";
import SecondaryPageHeader from "@/layouts/PageHeader/SecondaryPageHeader";
import PublishOptionModal from "../PublishOptionModal";
import { useCreateBlockNote } from "@blocknote/react";


function EditPanel() {
  const {mode} = useColorScheme()
  const [open, setOpen] = useState(false)

  const editor = useCreateBlockNote({
      initialContent:[
          {
              type: "paragraph",
              content: "If you want to add this custom style to your component, you can use the style or GlobalStyles component from MUI, or add it directly in a <style> tag within the component. Here's how you can do it:"
          }
      ]
  })

  return (
    <Stack>
      <SecondaryPageHeader handleClick={()=>setOpen(true)}/>
      <PublishOptionModal open={open} onClose={()=>setOpen(false)} editor={editor}/>
      <Box sx={{display: 'flex', alignContent: 'center', paddingBottom: 10}}>
          <Stack sx={{ margin: 'auto', width: '70%', gap:6}}>
            {/* <Input placeholder="title" onChange={(event)=>dispatchPostFormValue({type:'title', payload: event.target.value})}/> */}
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
 