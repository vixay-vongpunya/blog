import { Box, Card, CardContent, CardMedia, Skeleton, Stack } from "@mui/material";
import { Slabo_13px } from "next/font/google";


function HomePanelSkeleton(){
    return(
        <Box sx={{display: 'grid', gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2,1fr)',
            md:'repeat(3,1fr)'}, gap: '3.5em 2em'}}>
            {Array.from({length: 9}).map((_, index)=>(
                <Stack gap={1} key={index}>
                    <Skeleton variant="rectangular" height={120}/>
                    <Box sx={{ display: "flex", gap: '0.5em', alignItems: 'center'}}>
                        <Skeleton variant="circular" width={30} height={30}/>
                        <Skeleton variant="text" width={100}/>
                    </Box> 
                    <Skeleton variant="text" width={100}/>
                    <Skeleton variant="text" width={100}/>
                    <Skeleton variant="text" width={60}/>
                </Stack>
            ))}
        </Box>
    )
}

export default HomePanelSkeleton;