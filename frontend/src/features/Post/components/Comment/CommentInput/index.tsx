import { SendIcon } from "@/components/Icons/CustomIcons"
import { queryKey } from "@/components/post-list-hooks/post-card-hook"
import { useCreateCommentMutation } from "@/features/post/hooks/query"
import { ReplyTarget, useReplyContext } from "@/features/post/hooks/ReplyProvider"
import { Box, Button, ButtonBase, InputBase, Stack } from "@mui/material"
import { useEffect, useState } from "react"

type CommentInputProps = {
    postId: string,
}

export const commentQueryKey = {
    postComments: (postId: string) => ['post-comments', postId],
    commentReplies: (commentId: string) => ['comment-replies', commentId]
} as const

function CommentInput({postId}: CommentInputProps){
    const {target, setReplyTarget} = useReplyContext()
    const [comment, setComment] = useState<string>(target.replyTo ? target.replyTo?.displayName : '')
    const {mutate: createComment}= useCreateCommentMutation(target?.pageNumber,
        target.parent ? commentQueryKey.commentReplies(target.parent.commentId) : commentQueryKey.postComments(postId)
    )

    const handleCommentCreate = () => { 
        if(comment === '') return
        const data = {
            postId: postId,
            content: target.replyTo ? comment.split(target.replyTo.displayName)[1]: comment,
            grandParentId: target.grandParentId,
            parentId: target.parent ? target.parent.commentId : null,
            replyToUserId: target.replyTo ? target.replyTo.userId : null,
        }
        
        createComment(data)
        setComment('')
        setReplyTarget(prev=>({...prev, replyTo: null, pageNumber: 0}))
    } 
    
    useEffect(()=>{
        if(target.replyTo){
            setComment(target.replyTo.displayName)
        }
    },[target.replyTo])

    return(
        <Stack gap={1}
            sx={{
                display: 'flex',
                backgroundColor: 'background.secondary',
                padding: '1em',
                borderRadius: 1,
                width: "100%",
            }}>
            <InputBase
                placeholder= {target.parent ? 'reply to ' + target.parent.displayName : 'comment...'} 
                multiline
                value={comment}
                maxRows={4}
                onChange={(event)=>setComment(event.target.value)}
                />
            <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
                <ButtonBase 
                    onClick={()=>handleCommentCreate()}>
                    <SendIcon/>
                </ButtonBase>
            </Box> 
        </Stack>
    )
}

export default CommentInput