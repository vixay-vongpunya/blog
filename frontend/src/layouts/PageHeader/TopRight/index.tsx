import { Box, Button, Stack } from "@mui/material";
import { BellIcon } from "@/components/Icons/CustomIcons";
import ProfileMenu from "../ProfileMenu";
import { ReactNode, useState } from "react";
import ProfileImage from "@/components/ProfileImage";
import { useGetSelfQuery } from "@/utils/hooks/user/query";
import { usePathname, useRouter } from "next/navigation";
import { useMatchMedia } from "@/utils/useMatchMedia";

function TopRight(){
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const pathname = usePathname()
  const router = useRouter()
  const matchMedia = useMatchMedia()
  const {data: self} = useGetSelfQuery()

  const isEditPage = pathname === "/edit"

  const handleEdit = () =>{
    if(isEditPage) router.push('/edit/detail')
    else router.push('/edit')
  }
  console.log(isEditPage)

  if(!self) return
  return(
      <Stack direction= 'row'
        sx={{
          paddingLeft: '1.5em',
          gap:'1.5em',
          alignItems:'center',
          marginLeft:'auto'
        }}>
       <Button variant='contained' onClick={handleEdit}>
        {isEditPage ? "Next" : "Edit"}</Button>
  
      
      {matchMedia !== "mobile" && <BellIcon/>}
      {/* need to adjust this */}
      <Box  sx={{
        flexShrink:0,
        borderRadius: '50%', 
        height: '3em', 
        width: '3em', 
        overflow:'hidden',
        cursor: 'pointer'}}
        onClick={(event)=>setAnchorEl(event.currentTarget)}>
          <ProfileImage size='medium' path={self?.profileImage} alt=''/>
      </Box>
      <ProfileMenu open={open} onClose={()=>setAnchorEl(null)} anchorEl={anchorEl}/>
    </Stack>
  )
}

export default TopRight;