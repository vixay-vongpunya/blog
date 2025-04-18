
import SearchBar from "@/common/SearchBar";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { Box, Button, Input, Stack, Typography, useColorScheme, useTheme } from "@mui/material";
import { GlobalStyles } from "@mui/material";
import { BlockNoteView} from "@blocknote/mantine";
import { category, Category} from "@/data/blogs";
import { useState } from "react";



function EditPanel() {
  const {mode} = useColorScheme()
  const [open, setOpen] = useState<boolean>(false)
  const [selected, setSelected] = useState<Category[]>([])
  const editor = useCreateBlockNote({
    initialContent:[
      {
        type: "paragraph",
        content: "If you want to add this custom style to your component, you can use the style or GlobalStyles component from MUI, or add it directly in a <style> tag within the component. Here's how you can do it:"
      }
    ]
  })

  const removeSelected = (index: number) =>{
    // splice mutate the array and return the removed element
    // more performant compared to filter
    const temp = [...selected]
    temp.splice(index,1)
    setSelected(temp)
  }

  return (
      <Box sx={{
        display: 'flex',
        alignContent: 'center',
        paddingBottom: 10
        }}>
          <Stack 
            sx={{
              margin: 'auto',
              width: '70%',
              gap:6
            }}>
              <Box sx={{
                display: 'flex',
                gap: 2
              }}>
                <Typography variant='h4'>Title</Typography>
                <Input placeholder="title"/>
              </Box>
            <Stack sx={{
              gap:2
            }}>
              <Typography variant='h4'>Category<span color="red" className="cursor-pointer"onClick={()=>setOpen(prev=>!prev)}>+</span></Typography>
              <Stack sx={{
                maxHeight: open ? '300px': 0,
                transform: open? 'translateY(0)': 'translateY(-10px)',
                transition: 'all 0.3s ease-in-out',
                overflow: 'hidden',
                gap: 2
              }}>
                <Box sx={{

                }}>
                <SearchBar/>
                  <Box>
                  {category.map((item, index)=>(
                        <Button key={index} variant='outlined' onClick={()=>setSelected(prev=>[...prev, item])}>{item.type}</Button>
                    ))}
                    
                  </Box>
                </Box>
              </Stack>
              <Stack sx={{
                marginTop: open ? 2 : 0,
                transition: 'margin-top 0.3s ease-in-out'
              }}>
              <Box>
                {/* need to handle doubble click */}
                {selected.map((item, index)=>(
                      <Button variant='outlined' onClick={()=>removeSelected(index)}>{item.type}</Button>
                  ))}
              </Box> 
               <style>
              {`
                .bn-editor {
                  background-color: transparent;
                }
              `}
            </style>
            
              </Stack>
            </Stack>
            <BlockNoteView editor={editor} theme={mode as 'light' | 'dark'} />  
          </Stack>
      </Box>)
}

export default EditPanel;
 