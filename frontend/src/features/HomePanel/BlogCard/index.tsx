import { Typography } from "@mui/material"

type BlogCardProps = {
    key: string,
    title: string,
    content: string,
    author: string,
    created: string,
}

function BlogCard({key, title, content, author, created}:BlogCardProps){
    return(
        <div key={key} className="rounded-lg shadow-sm transition-transform duration-300 hover:scale-105">
            <div className="relative h-48">
                <img src="./file.svg" className="object-cover h-full w-full"/>
            </div>
            <div className="px-6 py-4">
                <div className="pb-4 flex flex-col gap-4">
                    <Typography variant="h5" sx={{fontWeight: "bold"}}>{title}</Typography>
                    <Typography className="line-clamp-2 text-gray-400">{content}</Typography>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="rounded-full h-15 w-15 overflow-hidden">
                        <img src="./person.jpg" className="object-cover h-full w-full"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Typography sx={{fontWeight: "bold"}}>{author}</Typography>
                        <Typography className="text-gray-400">{created}</Typography>
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}

export default BlogCard