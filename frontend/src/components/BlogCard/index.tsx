import { Page } from "@/providers/PageProviders/hook"
import { Box, Typography } from "@mui/material"
import { useRouter } from "next/navigation"

type BlogCardProps = {
    id: string,
    title: string,
    content: string,
    author: string,
    created: string,
}

function BlogCard({id, title, content, author, created}:BlogCardProps){
    const route = useRouter()
    return(
        <Box key={id} className="rounded-lg shadow-sm transition-transform duration-300 hover:scale-105" 
        onClick={()=>route.push(Page.Post+`/${id}`)}>
            <Box className="relative h-48">
                <img src="./globe.svg" className="object-cover h-full w-full"/>
            </Box>
            <Box className="px-6 py-4">
                <Box className="pb-4 flex flex-col gap-4">
                    <Typography variant="h5" sx={{fontWeight: "bold"}}>{title}</Typography>
                    <Typography className="line-clamp-2 text-gray-400">{content}</Typography>
                </Box>
                <Box className="flex gap-4 items-center">
                    <Box className="rounded-full h-15 w-15 overflow-hidden">
                        <img src="./person.jpg" className="object-cover h-full w-full"/>
                    </Box>
                    <Box className="flex flex-col gap-2">
                        <Typography sx={{fontWeight: "bold"}}>{author}</Typography>
                        <Typography className="text-gray-400">{created}</Typography>
                    </Box>
                </Box>
            </Box>            
        </Box>
    )
}

export default BlogCard