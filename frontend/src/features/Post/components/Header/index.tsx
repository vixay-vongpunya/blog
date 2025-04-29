import { useUserSubscription } from "@/utils/globalQuery";
import { Box, Stack, Typography } from "@mui/material";

type HeaderProps = {
    author: {
        id: string,
        name: string
    }
}
function Header({author}:HeaderProps){
    const {mutate: userSubscription} = useUserSubscription()
    return(
        <Box>
            <Typography variant="h4">Transactional Emails For SaaS 101</Typography>
            <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                <Box sx={{height:50, width:50, borderRadius:"50%", overflow: "hidden"}}>
                    <img src="/person.jpg" className="object-cover h-full w-full"/>
                </Box>
                <Stack>
                    <Typography>
                        {author.name} &middot; 
                        <span className="underline cursor-pointer"
                            onClick={()=>userSubscription(author.id)}>
                                Follow
                        </span>
                    </Typography>
                    <Typography>2027/12/03</Typography>
                </Stack>
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