'use client'
import SearchBar from "@/common/SearchBar";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { Box, Button, Input, Stack, Typography, useColorScheme} from "@mui/material";
import { BlockNoteView} from "@blocknote/mantine";
import { useEffect, useState } from "react";
import { useBlogForm } from "../hooks/edit-blog-form";
import SecondaryPageHeader from "@/layouts/PageHeader/SecondaryPageHeader";
import CategoryCard from "@/components/CategoryCard";
import { useGetCategoryQuery } from "@/utils/globalQuery";
import { Category } from "@/domains/category/types";


function EditPanel() {
  const {mode} = useColorScheme()
  const [open, setOpen] = useState<boolean>(false)
  const {data: allCategories} = useGetCategoryQuery()
  const {blogFormValue, blogFormErrors, dispatchBlogFormValue, onSubmit, editor} = useBlogForm()
  const [categories, setCategories] = useState<Category[]>()
  const removeSelected = (index: number, item:Category) =>{
    // splice mutate the array and return the removed element
    // more performant compared to filter
    console.log("selected",blogFormValue.category)
    const temp = blogFormValue.category.filter((_:any, i: number)=>i!==index)
    setCategories((prev: any)=>[item, ...prev])
    dispatchBlogFormValue({type:'category', payload:temp})
  }
  //bad code
  useEffect(()=>{
    if(allCategories){
      setCategories(allCategories)
    }
  },[allCategories])
  
  const handleAddCategory = (index:number, item:Category) =>{
    setCategories((prev:any)=>prev.filter((_: any,i: number)=>i !== index))
    dispatchBlogFormValue({type:'category', payload:[...blogFormValue.category, item]})
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
                <Stack sx={{gap:2}}>
                  <SearchBar/>
                  <Box sx={{display: "flex", gap:1, marginLeft: '1em'}}>
                    {categories?.map((item, index:number)=>(
                          <CategoryCard
                            key={index} 
                            name={item.name}
                            onClick={()=>handleAddCategory(index, item)} />
                      ))}
                  </Box>
                </Stack>
              </Stack>
                <Box sx={{display: "flex", gap:1, marginLeft: '1em', marginTop: open ? 2 : 0,transition: 'margin-top 0.3s ease-in-out'}}>
                  {/* need to handle doubble click */}
                  {blogFormValue.category.map((item, index)=>(
                       <CategoryCard
                        key={index} 
                        name={item.name}
                        onClick={()=>removeSelected(index, item)}/>
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
 