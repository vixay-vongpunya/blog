import { Box } from "@mui/material";


function SmallImage(){
    return(
        <Box  sx={{flexShrink:0, borderRadius: '50%', height: '1.5em', width: '1.5em', overflow:'hidden'}}>
            <img src="./../person.jpg" className="object-cover h-full w-full"/>
        </Box>
    )
}

export default SmallImage;