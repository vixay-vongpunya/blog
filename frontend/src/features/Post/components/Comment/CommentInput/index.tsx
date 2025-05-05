import { Box, Button, InputBase, Stack } from "@mui/material"

type CommentInputProps = {
    content: string;
    setComment: (value: string)=>void;
    handleCommentCreate: ()=>void;
    handleCommentCancel: ()=>void;

}

function CommentInput({content, setComment, handleCommentCreate, handleCommentCancel}: CommentInputProps){
    return(
        <Stack gap={1}
            sx={{
                backgroundColor: 'background.secondary',
                padding: '1em',
                borderRadius: 1
            }}>
            <InputBase
                placeholder='comment...' 
                multiline
                value={content}
                maxRows={4}
                onChange={(event)=>setComment(event.target.value)}
                />
            <Box sx={{marginLeft: 'auto', display: 'flex', gap:1}}>
                <Button 
                    variant="outlined" 
                    onClick={()=>handleCommentCancel()} 
                    >cancel</Button>
                <Button 
                    variant="contained" 
                    onClick={()=>handleCommentCreate()} 
                    >response</Button>
            </Box> 
        </Stack>
    )
}

export default CommentInput