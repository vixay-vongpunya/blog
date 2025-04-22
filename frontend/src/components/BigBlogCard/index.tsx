import { Blog, Category} from "@/data/blogs"
import { Page } from "@/providers/PageProviders/hook"
import { Box, Button, Card, Stack, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import SmallImage from "../SmallImage"
import { SaveIcon } from "../Icons/CustomIcons"
import { useFetchCategory } from "@/utils/globalQuery"

function BigBlogCard({item}:{item:Blog}){
    const router = useRouter()
    const { data: category} = useFetchCategory()
    return(
        <Stack key={item._id}  
            sx={{
                // transition: 'transform 0.3s',
                cursor: 'pointer',
                borderRadius: 0,
                border: 'none',
                gap:'0.8em',
                paddingTop: '0.5em'
                // '&:hover':{
                //     transform: 'scale(105%)'
                // }

            }}
            onClick={()=>router.push(Page.Post+`/${item._id}`)}>
            <Box className="relative h-82">
                <img src="./../person.jpg" className="object-cover h-full w-full"/>
            </Box>
            <Stack direction='row' sx={{
                    gap: '0.5em',
                    alignItems: 'center'
                }}>
                    <SmallImage/>
                    <Typography variant='body2' color='textSecondary'>{item.author.name} &middot; {item.created}</Typography>
                </Stack>
            <Stack sx={{flexDirection:'column', gap: '0.5em'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', gap:'0.5em'}}>
                    <Typography variant="h5" 
                    sx={{fontWeight: "bold",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        WebkitLineClamp: 2,
                    }} >{item.title}</Typography>
                    <Typography  sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        WebkitLineClamp: 3,
                    }}color='text.secondary'>{item.content}</Typography>                       
                </Box>
                <Stack direction='row' sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Stack direction='row' sx={{
                        gap:1,
                    }}>
                        {category.slice(0,3).map((item: Category)=>(
                            <Button variant='outlined' sx={{
                                minWidth: 'fit-content',
                                padding: '0.2em 0.4em',
                                borderRadius: 2
                            }}>{item.name}</Button>
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
            </Stack>            
        </Stack>
    )
}

export default BigBlogCard;