import {  Blog, category } from "@/data/post"
import { Box, Button, Card, Divider, Pagination, Stack, Typography } from "@mui/material"
import SmallImage from "../SmallImage"
import { SaveIcon } from "../Icons/CustomIcons"


function HorizontalBlogCard({item, limit=3}:{item: Blog, limit:number}){
    return(
        <Box key={item._id}  sx={{
            display: "grid", 
            gridTemplateColumns: "3fr 5fr", 
            gap: 2,
            height: '150px'}} >
            <Box sx={{padding: '0.5em'}}>
                <img src="../person.jpg" className="object-cover h-full"/>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", gap:1}}>    
                <Typography variant="h5" sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    WebkitLineClamp: 2,
                }}>{item.title}</Typography>
                <Stack direction='row' sx={{
                        gap: '0.5em',
                        alignItems: 'center'
                    }}>
                        <SmallImage/>
                        <Typography variant='body2' color='textSecondary'>{item.author.name} &middot; {item.created}</Typography>
                </Stack>
                {/* need to work on here */}
                <Typography sx={{
                    color: 'text.secondary',
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    WebkitLineClamp: 2,
                }}>{item.content}</Typography>
                <Stack direction='row' sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Stack direction='row' sx={{
                        gap:1,
                    }}>
                        {category.slice(0,3).map(item=>(
                            <Button variant='outlined' sx={{
                                minWidth: 'fit-content',
                                padding: '0.2em 0.4em',
                                borderRadius: 2
                            }}>{item.type}</Button>
                        ))}
                        {category.length>3 && (
                            <Button variant='outlined' sx={{
                                minWidth: 'fit-content',
                                padding: '0.2em 0.4em',
                                borderRadius: 2
                            }}>+{category.length - 3}</Button>
                            )}
                    </Stack>
                    <Typography color='text.secondary'>
                        <SaveIcon/>
                    </Typography>
                </Stack>           
            
            </Box>

        </Box>


    )
}

export default HorizontalBlogCard