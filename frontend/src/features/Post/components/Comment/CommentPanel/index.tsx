import { Box, ButtonBase, Collapse, Stack, Typography } from "@mui/material";
import CommentCard from "../CommentCard";
import { useGetCommentsQuery, useGetCommentsTotalCountQuery } from "../../../hooks/query";
import { useState } from "react";
import CommentInput from "../CommentInput";
import { RoundButton } from "@/components/Button";
import { ArrowIcon } from "@/components/Icons/CustomIcons";
import ReplyProvider from "@/features/post/hooks/ReplyProvider";

type CommentPanelProps = {
    postId: string,

}
//comment on a post has undefined parentId,
//replying a comment has parentId and both have optional replyTo(shown as user name link infront of message)

function CommentPanel({postId}: CommentPanelProps){

    const [showLess, setShowLess] = useState<boolean>(false)
    // comments is at the bottom, query it later improve performance
    const {data: commentTotalCount} = useGetCommentsTotalCountQuery(postId)
    const {data: comments, hasNextPage, fetchNextPage} = useGetCommentsQuery(postId)
    console.log("cmt", comments)

    return(
        <Stack sx={{gap:'2em'}}>
            <Box display="flex" flexDirection="row" justifyContent="center">
                <Typography variant='h4'>Responses ({commentTotalCount})</Typography>
                <ButtonBase onClick={()=>setShowLess(!showLess)} sx={{ml: "auto"}}>
                    <Typography sx={{ transform: showLess ? 'rotate(-180deg)': 'rotate(0deg)', transition: "0.3s transform ease-in"}}>
                        <ArrowIcon/>
                    </Typography>
                </ButtonBase>
            </Box>            
            <CommentInput postId={postId}/>
            <Collapse in={!showLess} collapsedSize="0px">
                <ReplyProvider>
                    <Box sx={{display: "flex", flexDirection: "column", gap: "2em"}}>
                            {comments?.pages.map((page, index) =>
                            page.map(({id, content, user, createdAt, replyCount, replyToUser}:any, index:number)=>(
                                <CommentCard 
                                    key={index} 
                                    id={id} 
                                    content={content} 
                                    user={user} 
                                    createdAt={createdAt}
                                    postId={postId}
                                    replyCount={replyCount}
                                    replyToUser={replyToUser}
                                    parent={null}
                                    pageNumber={index}
                                />
                            ))  
                        )}
                        
                    </Box>
                </ReplyProvider>
            </Collapse>
            {!showLess && hasNextPage && <RoundButton text="See more" onClick={fetchNextPage}/>}
        </Stack>
    )
}

export default CommentPanel;