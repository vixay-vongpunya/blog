import { useAuth } from "@/providers/AuthProvider";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import { Box, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { BellIcon } from "@/components/Icons/CustomIcons";
import SmallImage from "@/components/SmallImage";
import ProfileMenu from "../ProfileMenu";
import { useState } from "react";



function TopRight(){
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
    return(
        <Stack direction= 'row'
        sx={{
          gap:'1.5em',
          alignItems:'center'
        }}>
        {/* { authenticated ? (
          <Button variant="contained" onClick={()=>{router.push(PagePath[Page.Login])}}>Log out</Button>
        ):(
          <>
            <Button variant="contained" onClick={()=>{router.push(PagePath[Page.Login])}}>Log in</Button>
            <Button variant="outlined" onClick={()=>{router.push(PagePath[Page.SignUp])}}>Sign Up</Button>
          </>
            )
        } */}
        {/* <ColorModeSelect/> */}
        <BellIcon/>
        <Box  sx={{
          flexShrink:0,
          borderRadius: '50%', 
          height: '3em', 
          width: '3em', 
          overflow:'hidden',
          cursor: 'pointer'}}
          onClick={(event)=>setAnchorEl(event.currentTarget)}>
            <img src="./../person.jpg" className="object-cover h-full w-full"/>
        </Box>
        <ProfileMenu open={open} onClose={()=>setAnchorEl(null)} anchorEl={anchorEl}/>
      </Stack>
    )
}

export default TopRight;