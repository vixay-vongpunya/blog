import { useGetCommentRepliesQuery } from "@/features/post/hooks/query";
import { Box, ButtonBase, Typography } from "@mui/material";
import CommentCard from "../CommentCard";

type CommentReplyCardProps = {
    commentId: string;
    postId: string;
    replyCount: number;
    depth: number;
}

function CommentReplyCard({commentId, postId, replyCount, depth}: CommentReplyCardProps){
    const {data: replies, fetchNextPage, hasNextPage} = useGetCommentRepliesQuery(commentId)
    console.log("at reply", replies)
    if(!replies) return <>loading</>
    return(
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            borderLeft: "1px solid",
            borderColor: "divider",
            marginLeft: "1em",
            paddingLeft: "1em",
            gap: "2em"
        }}>
            {
                replies?.pages.map((page) =>(  
                page.map(({id, content, user, createdAt, replyCount, replyToUser}: any) =>(
                        <CommentCard 
                            key={id}
                            id={id} 
                            content={content} 
                            user={user} 
                            createdAt={createdAt}
                            replyCount={replyCount}
                            postId={postId}
                            parentId={commentId}
                            replyToUser={replyToUser}
                            depth={depth}
                        />
                ))                     
            ))
            }
            {
                hasNextPage && 
                <ButtonBase onClick={()=>fetchNextPage()} sx={{width: "fit-content"}}>
                    <Typography>View more {replyCount - replies.pages.length * 12} replies </Typography>
                </ButtonBase>
            }
            
        </Box>
        
       
    )
}

export default CommentReplyCard;