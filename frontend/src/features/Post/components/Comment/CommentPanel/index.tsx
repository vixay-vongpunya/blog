import { Box, ButtonBase, Collapse, Stack, Typography } from "@mui/material";
import CommentCard from "../CommentCard";
import { useCreateCommentMutation, useGetCommentsQuery, useGetCommentsTotalCountQuery } from "../../../hooks/query";
import { useState } from "react";
import CommentInput from "../CommentInput";
import MoreButton from "@/components/MoreButton";
import { RoundButton } from "@/components/Button";
import { ArrowIcon } from "@/components/Icons/CustomIcons";

type CommentPanelProps = {
    postId: string,

}

function CommentPanel({postId}: CommentPanelProps){
    const [comment, setComment] = useState<string>('')
    const [showLess, setShowLess] = useState<boolean>(false)
    // comments is at the bottom, query it later improve performance
    const {data: totalCount} = useGetCommentsTotalCountQuery(postId)
    const {data: comments, hasNextPage, fetchNextPage} = useGetCommentsQuery(postId)
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
            <Box display="flex" flexDirection="row" justifyContent="center">
                <Typography variant='h4'>Responses ({totalCount})</Typography>
                <ButtonBase onClick={()=>setShowLess(!showLess)} sx={{ml: "auto"}}>
                    <Typography sx={{
                        transform: showLess ? 'rotate(-180deg)': 'rotate(0deg)',
                        transition: "0.3s transform ease-in"
                    }}>
                        <ArrowIcon/>
                    </Typography>
                </ButtonBase>
            </Box>
            
            <CommentInput 
                content={comment} 
                setComment={(value: string)=>setComment(value)} 
                handleCommentCreate={handleCommentCreate}
                handleCommentCancel={handleCommentCancel}/>
            <Collapse in={!showLess} collapsedSize="100px">
                <Box sx={{display: "flex", flexDirection: "column", gap: "2em"}}>
                    {comments?.pages.map((page, index) =>
                        page.map(({id, content, user, createdAt}:any, index:number)=>(
                            <CommentCard 
                                key={index} 
                                id={id} 
                                content={content} 
                                user={user} 
                                createdAt={createdAt}/>
                        ))
                    )}
                </Box>
            </Collapse>
            {!showLess && hasNextPage && <RoundButton text="See more" onClick={fetchNextPage}/>}
        </Stack>
    )
}

export default CommentPanel;