import { Box, Typography } from "@mui/material";

type HeaderProps = {
    title: string,
    views: number,
}
function Header({title, views}:HeaderProps){

    return(
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: {
                xs: "1em",
                sm: "2em"
            },
        }}>
            <Typography variant="h4"
                sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    WebkitLineClamp: 2,
                    textAlign: "center"
                }}>{title}</Typography>
            <Typography color="text.secondary" sx={{textAlign: "center"}}>2027/12/03 に公開 &middot; {views} views</Typography>
            {/* <Box sx={{display: "flex", alignItems: "center", gap: 1}}> */}
                {/* <Box sx={{height:50, width:50, borderRadius:"50%", overflow: "hidden"}}>
                    <img src="/person.jpg" className="object-cover h-full w-full"/>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}>
                    <Typography>
                        {author.name}
                    </Typography>
                    <Typography color="text.secondary">2027/12/03</Typography>
                </Box> */}


            {/* </Box>            */}
            
              
            {/* <Box sx={{
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
                
            </Box> */}
        </Box>
    )
}

export default Header;