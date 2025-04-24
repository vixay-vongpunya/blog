
import { Post } from "@/api/post"
import PostCardFooter from "@/components/PostCardFooter"
import { Box, Card, Divider, Pagination, Typography } from "@mui/material"


function RecentBlogCard({posts}:{posts: Post[] | undefined}){
    return(
        <Box sx={{
            display:"flex", 
            flexDirection:"column", 
            gap:4,
            paddingRight: '5em'}}>
            {posts?.map(({id, title, preview, author, categories, created})=>(
                <Box 
                    key={id}  
                    sx={{
                        display: "grid", 
                        gridTemplateColumns: "3fr 1fr", 
                        gap: 2,
                        height: '150px'}} >
                    <Box sx={{display: "flex", flexDirection: "column"}}>
                        <Typography variant="h5" sx={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            WebkitLineClamp: 2,
                        }}>{title}</Typography>
                        <Typography sx={{fontSize: "12px"}}>{created} &middot; {author.name}</Typography>
                        {/* need to work on here */}
                        <Typography sx={{
                            color: 'text.secondary',
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            WebkitLineClamp: 2,
                            marginTop: 2 
                        }}>{preview}</Typography>
                        <PostCardFooter categories={categories} />

                    </Box>
                    <Box sx={{padding: '0.5em'}}>
                        <img src="../person.jpg" className="object-cover h-full"/>
                    </Box>
                    <Divider sx={{color:'text.secondary'}}/>
                </Box>
            ))}
            <Pagination hidePrevButton hideNextButton sx={{alignSelf: 'center', margin:'auto'}} count={10} boundaryCount={10}/>
        </Box>

    )
}

export default RecentBlogCard