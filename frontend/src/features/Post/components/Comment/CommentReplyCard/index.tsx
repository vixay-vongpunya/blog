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
                page.map(({id, content, user, createdAt, parentId, replyCount, replyToUser}: any, index: number) =>(
                        <CommentCard 
                            key={id}
                            id={id} 
                            content={content} 
                            user={user} 
                            createdAt={createdAt}
                            replyCount={replyCount}
                            postId={postId}
                            parent={{
                                commentId: parentId,
                                displayName: user.displayName}
                            }
                            replyToUser={replyToUser}
                            pageNumber={index}
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