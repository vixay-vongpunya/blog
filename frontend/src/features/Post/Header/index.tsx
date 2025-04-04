import { Box, Typography } from "@mui/material";


function Header(){
    return(
        <Box>
            <Typography variant="h4">Transactional Emails For SaaS 101</Typography>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: 2}}>
                <Box sx={{height:50, width:50, borderRadius:"50%", overflow: "hidden"}}>
                    <img src="/person.jpg" className="object-cover h-full w-full"/>
                </Box>
                <Box>
                    <Typography>Mr. smith &middot; <span className="underline">Follow</span></Typography>
                    <Typography>2027/12/03</Typography>
                </Box>
            </Box>
            <Box sx={{
                display: "flex", 
                justifyContent: "space-between",
                padding: 1,
                marginTop: 2,
                marginBottom: 4,
                borderTop: "1px solid #cccc",
                borderBottom: "1px solid #cccc"}}>
                <Box sx={{display: "flex", gap:2}}>
                    <Typography>like</Typography>
                    <Typography>comments</Typography>
                </Box>
                <Box>
                    <Typography>share</Typography>
                </Box>
                
            </Box>
            <img  src="/person.jpg" className="mx-auto"/>
        </Box>
    )
}

export default Header;