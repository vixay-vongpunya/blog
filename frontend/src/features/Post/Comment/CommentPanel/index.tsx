import { Box, Button, Input, InputBase, Stack, TextareaAutosize, TextField, Typography } from "@mui/material";
import CommentCard from "../CommentCard";
import { blogs } from "@/data/post";
import { useCreateCommentMutation } from "../../hooks/query";
import { useState } from "react";
import { Comment } from "@/api/post";

type CommentPanelProps = {
    postId: string,
    comments: Comment[] | undefined,
}

function CommentPanel({postId, comments}: CommentPanelProps){
    const [comment, setComment] = useState<string>('')
    const {mutate: createComment}= useCreateCommentMutation()

    const onCreateComment = () => {
        const data = {
            postId: postId,
            comment: comment
        }
        createComment(data)
        setComment('')
    } 

    const onCancelComment = () => {
        setComment('')
    }

    const commentInput = (
        <Stack gap={1}
            sx={{
                backgroundColor: 'background.secondary',
                padding: '1em',
                borderRadius: 1
            }}>
            <InputBase
                placeholder='comment...' 
                multiline
                value={comment}
                maxRows={4}
                onChange={(event)=>setComment(event.target.value)}
                />
            <Box sx={{marginLeft: 'auto', display: 'flex', gap:1}}>
                <Button 
                    variant="outlined" 
                    onClick={()=>onCancelComment()} 
                    >cancel</Button>
                <Button 
                    variant="contained" 
                    onClick={()=>onCreateComment()} 
                    >response</Button>
            </Box> 
        </Stack>
                
    )
    return(
        <Stack sx={{gap:'2em'}}>
            <Typography variant='h4'>Responses (181)</Typography>
            {commentInput}
            {comments?.map(({id, content, user, createdAt}, index)=>(
                <CommentCard 
                    key={index} 
                    id={id} 
                    content={content} 
                    user={user} 
                    createdAt={createdAt}/>
            ))}
        </Stack>
    )
}

export default CommentPanel;