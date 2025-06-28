import { Button, Stack, Typography } from "@mui/material"
import { SaveIcon } from "../../components/Icons/CustomIcons"

type PostCardFooterProps = {
    views: number;
    savedPost: {id: string } | undefined;
    onClickSave: (event: React.MouseEvent<HTMLElement>) => void,
}

function PostCardFooter({views, savedPost, onClickSave}:PostCardFooterProps){
    return(
        <> 
            <Stack direction='row' 
                sx={{ gap:1 }}>
                <Typography color="text.secondary">{views} views</Typography>
            </Stack>
            <Typography color='text.secondary'  onClick={onClickSave}>
                <SaveIcon isSaved={!!savedPost}/>
            </Typography>
        </>  
    )
}

export default PostCardFooter