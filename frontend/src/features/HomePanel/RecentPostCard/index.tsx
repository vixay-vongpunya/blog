import { blogValues } from "@/data/blogs"
import { Box, Typography } from "@mui/material"


function RecentPostCard({blogs}:{blogs: blogValues[]}){
    return(
            <Box sx={{
                display:"flex", 
                flexDirection:"column", 
                gap:4}}>
                {blogs.map(({key, title, content, author, created}, index)=>(
                    <Box key={index}  sx={{
                        display: "grid", 
                        gridTemplateColumns: "2fr 1fr", 
                        gap: 2}} >
                        <Box sx={{display: "flex", flexDirection: "column"}}>
                            <Typography variant="h5" className="strict-tracking">{title}</Typography>
                            <Typography sx={{fontSize: "10px"}}>{created} &middot; {author}</Typography>
                            {/* need to work on here */}
                            <Typography sx={{
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                WebkitLineClamp: 3,
                                marginTop: 2 
                            }}>{content}</Typography>

                        </Box>
                        <img src="./person.jpg" className="object-cover w-full"/>
                        <hr className="text-gray-400"/>
                    </Box>
                ))}
            </Box>

    )
}

export default RecentPostCard