import { blogValues, category } from "@/data/blogs"
import { Box, Card, Divider, Pagination, Stack, Typography } from "@mui/material"
import SmallImage from "../SmallImage"


function SecondaryBlogCard({blogs}:{blogs: blogValues[] | undefined}){
    return(
            <Box sx={{
                display:"flex", 
                flexDirection:"column", 
                gap:4,
                paddingRight: '5em'}}>
                {blogs?.slice(0,3).map(({key, title, content, author, created})=>(
                    <Box key={key}  sx={{
                        display: "grid", 
                        gridTemplateColumns: "3fr 5fr", 
                        gap: 2,
                        height: '150px'}} >
                        <Box sx={{padding: '0.5em'}}>
                            <img src="../person.jpg" className="object-cover h-full"/>
                        </Box>
                        <Box sx={{display: "flex", flexDirection: "column"}}>
                            
                            <Typography variant="h5" sx={{
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                WebkitLineClamp: 2,
                            }}>{title}</Typography>
                            <Stack direction='row' sx={{
                                    gap: '0.5em',
                                    alignItems: 'center'
                                }}>
                                    <SmallImage/>
                                    <Typography variant='body2' color='textSecondary'>{author} &middot; {created}</Typography>
                            </Stack>
                            {/* need to work on here */}
                            <Typography sx={{
                                color: 'text.secondary',
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                WebkitLineClamp: 2,
                                marginTop: 2 
                            }}>{content}</Typography>
                        
                        </Box>

                    </Box>
                ))}
            </Box>

    )
}

export default SecondaryBlogCard