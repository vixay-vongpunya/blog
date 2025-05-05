import { Box, Divider, useColorScheme } from "@mui/material"
import Header from "../Header"
import { BlockNoteView } from "@blocknote/mantine"
import AuthorCard from "../AuthorCard"
import { Ref } from "react"
import { BlockNoteEditor } from "@blocknote/core"

type PostContentCardProps = {
    author:{
        id: string;
        name: string
    };
    contentRef: Ref<unknown>;
    editor: BlockNoteEditor;
}

function PostContentCard({author, contentRef, editor}: PostContentCardProps){
    const {mode} = useColorScheme()
    return(
        <>
            <Header author={author}/>   
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
        </>
    )
}

export default PostContentCard