import { queryKey } from "@/components/post-list-hooks/post-card-hook"
import { useCreateCommentMutation } from "@/features/post/hooks/query"
import { ReplyTarget } from "@/features/post/hooks/ReplyProvider"
import { Box, Button, InputBase, Stack } from "@mui/material"
import { useState } from "react"

type CommentInputProps = {
    postId: string,
    parent?: {
        id: string,
        displayName: string
    },
    replyToUser?: {
        userId: string,
        displayName: string
    }
}

export const commentQueryKey = {
    postComments: (postId: string) => ['post-comments', postId],
    commentReplies: (commentId: string) => ['comment-replies', commentId]
} as const

function CommentInput({postId, parent, replyToUser}: CommentInputProps){
    const [comment, setComment] = useState<string>(replyToUser ? replyToUser?.displayName : '')
    const {mutate: createComment}= useCreateCommentMutation(
        parent ? commentQueryKey.commentReplies(parent.id) : commentQueryKey.postComments(postId)
    )
    console.log("at input", replyToUser, parent)
    const handleCommentCreate = () => { 
        if(comment === '') return
        const data = {
            postId: postId,
            content: replyToUser ? comment.split(replyToUser.displayName)[1]: comment,
            parentId: parent ? parent.id : undefined,
            replyToUserId: replyToUser?.userId,
        }
        console.log("at input", data)
        createComment(data)
        setComment('')
    } 

    const handleCommentCancel = () => {
        setComment('')
    }

    return(
        <Stack gap={1}
            sx={{
                backgroundColor: 'background.secondary',
                padding: '1em',
                borderRadius: 1,
                width: "100%",
            }}>
            <InputBase
                placeholder= {parent ? 'reply to ' + parent.displayName : 'comment...'} 
                multiline
                value={comment}
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