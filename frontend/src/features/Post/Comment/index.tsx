import { Input, Stack, Typography } from "@mui/material";
import CommentCard from "./CommentCard";
import { blogs } from "@/data/blogs";

function CommentPanel(){
    return(
        <Stack sx={{gap:'2em'}}>
            <Typography variant='h4'>Responses (181)</Typography>
            <Input placeholder='comment...'/>
            {blogs.map(({key, title, content, author, created}, index)=>(
                <CommentCard id={key} title={title} content={content} author={author} created={created}/>
            ))}
        </Stack>
    )
}

export default CommentPanel;