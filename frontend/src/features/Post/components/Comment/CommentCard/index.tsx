
import { useGetSelfQuery } from "@/utils/hooks/user/query";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { createContext, useReducer, useState } from "react";
import CommentInput from "../CommentInput";
import { formatDate } from "@/utils/date-formating";
import CommentReplyCard from "../CommentReplyCard";
import { useReplyContext } from "@/features/post/hooks/ReplyProvider";
import { useRouter } from "next/navigation";
import { Page, PagePath } from "@/providers/PageProviders/hook";

type CommentCardProps = {
    id : string
    content: string,
    user: {
        id: string,
        displayName: string
    },
    postId: string,
    createdAt: string,
    replyCount: any,
    parentId: string,
    replyToUser: {
        id: string,
        name: string,
        displayName: string
    }
    depth?: number,
}


function CommentCard({id, content, user,  createdAt, postId, replyCount, parentId, replyToUser, depth = 1}: CommentCardProps){
    const { data: me } = useGetSelfQuery()
    const [openReply, setOpenReply] = useState(false)
    const [loadReply, setLoadReply] = useState(false)
    const { replyTarget, setReplyTarget} = useReplyContext()
    const router = useRouter()
    
    const handleLoadMore = () => {
        if(!loadReply){
            setLoadReply(true)
        }
    }

    const handleOpenReply = () => {
        console.log(depth)
        if(depth > 2){
            setReplyTarget({parentId: parentId, userId: user.id, displayName: user.displayName})
        }else{
            setOpenReply(!openReply)
        }
    }

    return(
        <Stack key={id} sx={{
            flexDirection:'row', 
            width:'100%', 
            gap: '0.5em',
            }}>
            <Box  sx={{flexShrink:0, borderRadius: '50%', height: '3em', width: '3em', overflow:'hidden'}}>
                    <img src="./../person.jpg" className="object-cover h-full w-full"/>
            </Box>
            <Box flexGrow="1" display="flex" flexDirection="column" gap="2em">
                <Box display="flex" flexDirection="column"  gap="0.2em">
                    <Box sx={{display: 'flex', 
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap:'5em'}}>
                        <Typography>{user.displayName} {user.id == me?.id &&  <strong> (author)</strong> }</Typography>                                    
                    </Box>
                    <Box className="flex gap-4 items-center">
                            <Typography  sx={{
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                WebkitLineClamp: 3,
                            }}>
                                {replyToUser && <Typography component="span" color="info.light" sx={{
                                    paddingRight: '0.5em',
                                    '&:hover':{
                                        textDecoration: 'underline'
                                    }
                                }}
                                onClick={()=>router.push(`${PagePath[Page.Profile]}/${replyToUser.name}`)}>
                                    {replyToUser.displayName}
                                    </Typography>} 
                                {content}</Typography>    
                    </Box>
                    <Box display="flex" gap="1em">
                        <Typography fontWeight="bold" variant="body2" color="text.secondary">{formatDate(createdAt)}</Typography>
                        <ButtonBase onClick={()=>handleOpenReply()} sx={{width: "fit-content"}}>
                            <Typography fontWeight="bold" variant="body2" color="text.secondary">Reply</Typography>
                        </ButtonBase>
                    </Box>
                </Box>               
                {
                    replyCount > 0 && 
                    (
                        loadReply ? <CommentReplyCard commentId={id} postId={postId} replyCount={replyCount} depth={depth+1}/> :
                        <ButtonBase onClick={handleLoadMore} sx={{width: "fit-content"}}>
                            <Typography>View all {replyCount} replies</Typography>
                        </ButtonBase>   
                    )                                                   
                }
                { (openReply || (replyTarget?.parentId === id)) && 
                    <CommentInput postId={postId} 
                        parent={{id: id, displayName: user.displayName}} 
                        replyToUser={replyTarget}/> 
                }
            </Box>
        </Stack> 
    )
}

export default CommentCard;