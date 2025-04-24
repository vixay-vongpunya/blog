import { Button, Stack, Typography } from "@mui/material"
import { SaveIcon } from "../Icons/CustomIcons"
import { Category } from "@/api/category"

type PostCardFooterProps = {
    categories: Category[]
}

function PostCardFooter({categories}:PostCardFooterProps){
    return(
        <Stack direction='row' sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <Stack direction='row' sx={{
                gap:1,
            }}>
                {categories.slice(0,3).map((item: Category)=>(
                    <Button 
                        key={item.id}
                        variant='outlined' 
                        sx={{
                            minWidth: 'fit-content',
                            padding: '0.2em 0.4em',
                            borderRadius: 2
                        }}>
                    {item.name}</Button>
                ))}
                {categories.length>3 && (
                    <Button variant='outlined' 
                        sx={{
                            minWidth: 'fit-content',
                            padding: '0.2em 0.4em',
                            borderRadius: 2
                        }}>
                        +{categories.length - 3}</Button>
                    )}
            </Stack>
            <Typography color='text.secondary'>
                <SaveIcon/>
            </Typography>
        </Stack>  
    )
}

export default PostCardFooter