
import SearchBar from "@/common/SearchBar";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { Box, Button, Input, Stack, Typography, useColorScheme, useTheme } from "@mui/material";
import { BlockNoteView} from "@blocknote/mantine";
import { Category} from "@/data/blogs";
import { useState } from "react";
import { useBlogForm } from "../hooks/edit-blog-form";
import SecondaryPageHeader from "@/layouts/PageHeader/SecondaryPageHeader";
import { useAtom } from "jotai";
import { initialData } from "@/providers/AuthProvider";


function EditPanel() {
  const {mode} = useColorScheme()
  const [open, setOpen] = useState<boolean>(false)
  const {blogFormValue, blogFormErrors, dispatchBlogFormValue, onSubmit, editor} = useBlogForm()
  const [data] = useAtom(initialData)

  const removeSelected = (index: number) =>{
    // splice mutate the array and return the removed element
    // more performant compared to filter
    console.log("selected",blogFormValue.category)
    const temp = [...blogFormValue.category]
    temp.splice(index,1)
    dispatchBlogFormValue({type:'category', payload:temp})
  }
  
  return (
    <Stack>
      <SecondaryPageHeader handleClick={()=>onSubmit()}/>
      <Box sx={{display: 'flex', alignContent: 'center', paddingBottom: 10}}>
          <Stack sx={{ margin: 'auto', width: '70%', gap:6}}>
              <Box sx={{ display: 'flex', gap: 2}}>
                <Typography variant='h4'>
                  Title
                </Typography>
                <Input placeholder="title" onChange={(event)=>dispatchBlogFormValue({type:'title', payload: event.target.value})}/>
              </Box>
            <Stack sx={{gap:2}}>
              <Typography variant='h4'>
                Category
                <span 
                  color="red" 
                  className="cursor-pointer"
                  onClick={()=>setOpen(prev=>!prev)}>+</span>
              </Typography>
              <Stack sx={{
                maxHeight: open ? '300px': 0,
                transform: open? 'translateY(0)': 'translateY(-10px)',
                transition: 'all 0.3s ease-in-out',
                overflow: 'hidden',
                gap: 2
              }}>
                <Box>
                  <SearchBar/>
                  <Box>
                  {data?.map((item:any, index:number)=>(
                        <Button 
                        key={index} 
                        variant='outlined' 
                        onClick={()=>dispatchBlogFormValue({type:'category', payload:[...blogFormValue.category,item]})}>
                          {item.name}
                        </Button>
                    ))}
                    
                  </Box>
                </Box>
              </Stack>
                <Box sx={{marginTop: open ? 2 : 0,transition: 'margin-top 0.3s ease-in-out'}}>
                  {/* need to handle doubble click */}
                  {blogFormValue.category.map(({id, name}, index)=>(
                        <Button variant='outlined' 
                        key={index}
                        onClick={()=>removeSelected(index)}>{name}</Button>
                    ))}
                </Box> 
            </Stack>
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
 