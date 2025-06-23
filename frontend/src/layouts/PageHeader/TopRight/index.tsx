import { Box, Button, Stack } from "@mui/material";
import { BellIcon } from "@/components/Icons/CustomIcons";
import ProfileMenu from "../ProfileMenu";
import { ReactNode, useState } from "react";
import ProfileImage from "@/components/ProfileImage";
import { useGetSelfQuery } from "@/utils/hooks/user/query";
import { useRouter } from "next/navigation";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import { useMatchMedia } from "@/utils/useMatchMedia";

function TopRight(){
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const router = useRouter()
  const matchMedia = useMatchMedia()
  const {data: self} = useGetSelfQuery()
    return(
        <Stack direction= 'row'
          sx={{
            paddingLeft: '1.5em',
            gap:'1.5em',
            alignItems:'center',
            marginLeft:'auto'
          }}>
        { matchMedia !== "mobile" && <Button variant='contained' onClick={()=>{router.push(PagePath[Page.Edit])}}>Edit</Button>}
        
        <BellIcon/>
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