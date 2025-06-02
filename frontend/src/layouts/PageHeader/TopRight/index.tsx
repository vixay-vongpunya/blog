import { Box, Stack } from "@mui/material";
import { BellIcon } from "@/components/Icons/CustomIcons";
import ProfileMenu from "../ProfileMenu";
import { ReactNode, useState } from "react";
import ProfileImage from "@/components/ProfileImage";
import { useGetSelfQuery } from "@/utils/hooks/user/query";

function TopRight({element}:{element: ReactNode}){
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const {data: self} = useGetSelfQuery()
    return(
        <Stack direction= 'row'
          sx={{
            gap:'1.5em',
            alignItems:'center'
          }}>
        
        {element}

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