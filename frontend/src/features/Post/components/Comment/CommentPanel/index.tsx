import { Stack, Typography } from "@mui/material";
import CommentCard from "../CommentCard";
import { useCreateCommentMutation, useGetCommentsQuery } from "../../../hooks/query";
import { useState } from "react";
import CommentInput from "../CommentInput";

type CommentPanelProps = {
    postId: string,

}

function CommentPanel({postId}: CommentPanelProps){

    const [comment, setComment] = useState<string>('')
    // comments is at the bottom, query it later improve performance
    const {data: comments} = useGetCommentsQuery(postId)
    const {mutate: createComment}= useCreateCommentMutation(postId)

    const handleCommentCreate = () => {
        const data = {
            postId: postId,
            content: comment
        }
        createComment(data)
        setComment('')
    } 

    const handleCommentCancel = () => {
        setComment('')
    }

    return(
        <Stack sx={{gap:'2em'}}>
            <Typography variant='h4'>Responses (181)</Typography>
            <CommentInput 
                content={comment} 
                setComment={(value: string)=>setComment(value)} 
                handleCommentCreate={handleCommentCreate}
                handleCommentCancel={handleCommentCancel}/>
            {comments?.map(({id, content, user, createdAt}:any, index:number)=>(
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