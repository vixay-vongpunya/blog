import { Box, ButtonBase, Card, Collapse, Divider, Typography, useColorScheme } from "@mui/material"
import { BlockNoteView } from "@blocknote/mantine"
import AuthorCard from "../AuthorCard"
import { Ref, RefObject, useState } from "react"
import { BlockNoteEditor } from "@blocknote/core"
import { useMatchMedia } from "@/utils/useMatchMedia"
import CategoryList from "@/components/CategoryList"
import { SaveIcon, TOCIcon } from "@/components/Icons/CustomIcons"
import TabelofContent from "../TableofContent"
import CommentPanel from "../Comment/CommentPanel"
import { Post } from "@/domains/post/types"
import { usePostCard } from "@/components/post-list-hooks/post-card-hook"
import { usePostStore } from "@/utils/hooks/post/store"
import { setPostQueryData, useCreateSavePostMutation, useDeleteSavePostMutation } from "../../hooks/query"

type PostContentCardProps = {
    post: Post,
    contentRef: RefObject<HTMLDivElement | null>;
    editor: BlockNoteEditor;
    isContentRendered: boolean;
}

function PostContentCard({ post, contentRef, editor, isContentRendered}: PostContentCardProps){
    const {setQueryData} = setPostQueryData()
    const {mutate: createSavePost} = useCreateSavePostMutation()
    const {mutate: deleteSavePost} = useDeleteSavePostMutation()
    const {mode} = useColorScheme()
    const matchMedia = useMatchMedia()
    const [open, setOpen] = useState<boolean>(false)
    const {selectedPost} = usePostStore()
    const {onClickSave} = usePostCard()

    let isMobile = matchMedia === "mobile"

    const handleOnSave = (event: React.MouseEvent<HTMLElement>) => {
        console.log(selectedPost.pageNumber, selectedPost.queryKey)
        if(selectedPost.pageNumber !== undefined && selectedPost.queryKey !== undefined){
            //to sync with the post list
            onClickSave(event, selectedPost.pageNumber, post.id, post.savedPosts, selectedPost.queryKey)
        }
        else{
            console.log(post.savedPosts)
            //case of post is pasted form url(not selected form postlist)
            if(post.savedPosts){
                deleteSavePost(post.savedPosts.id)
            }
            else{
                createSavePost(post.id)
            }
        }
        setQueryData(post.id)
    }
    
    return(
        <Card
            elevation={0}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                border: isMobile ? 'none' : '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                backgroundColor: 'transparent',
                padding: {
                    xs : 0,
                    sm: '2em 4em'
                },
                gap: {
                    xs: '2em',
                    sm: '3em'
                },
        }}>
        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <CategoryList categories={post.categories}/>
            <Box sx={{display: "flex", gap: "1em"}}>
                {matchMedia === "mobile" && 
                    <ButtonBase sx={{ml: "auto"}} onClick={()=>setOpen(!open)}>
                        <TOCIcon/>
                    </ButtonBase>
                }
                <Typography color='text.secondary'  onClick={handleOnSave}>
                    <SaveIcon isSaved={!!post.savedPosts}/>
                </Typography>
            </Box>
        </Box>
        <Box display="flex" flexDirection = "column" alignItems="center">
            {/* using box to avoid gap when collapsed */}
            <img src="/person.jpg"/>
            {isContentRendered && 
                <Collapse in={open} orientation="vertical" sx={{width: "100%"}}>
                    <TabelofContent contentRef={contentRef} />
                </Collapse>   
            }
        </Box>
        <Box ref={contentRef}>
            <BlockNoteView 
                editor={editor}
                editable={false}
                theme={mode as 'light' | 'dark'}
            />
        </Box>             
        <Divider>
            <AuthorCard id='1'author='Mr. Smith'/>
        </Divider>
        <CommentPanel postId={post.id}/>
    </Card>
    )
}

export default PostContentCard