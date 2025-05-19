import { Button, Stack, Typography } from "@mui/material"
import { SaveIcon } from "../../components/Icons/CustomIcons"
import { Category } from "@/domains/category/types"

type PostCardFooterProps = {
    savedPost: {id: string } | null;
    categories: Category[],
    onClickCategory: (event: React.MouseEvent<HTMLButtonElement>, category: Category)=>void,
    onClickSave: (event: React.MouseEvent<HTMLElement>) => void,
}

function PostCardFooter({savedPost, categories, onClickCategory, onClickSave}:PostCardFooterProps){
    return(
        <> 
            <Stack direction='row' 
                sx={{ gap:1 }}>
                {categories?.slice(0,3).map((category: Category)=>(
                    <Button 
                        key={category.id}
                        variant='outlined' 
                        sx={{ minWidth: 'fit-content', padding: '0.2em 0.4em', borderRadius: 2}}
                        onClick={(event) => onClickCategory(event, category)}>
                            <Typography variant="body2">
                                {category.name}
                            </Typography>
                    </Button>
                ))}
                {categories?.length>3 && (
                    <Button variant='outlined' 
                        sx={{ minWidth: 'fit-content',padding: '0.2em 0.4em',borderRadius: 2}}>
                            <Typography variant="body2">
                            +{categories.length - 3}
                            </Typography>
                        </Button>
                    )}
            </Stack>
            <Typography color='text.secondary'  onClick={onClickSave}>
                <SaveIcon isSaved={!!savedPost}/>
            </Typography>
        </>  
    )
}

export default PostCardFooter