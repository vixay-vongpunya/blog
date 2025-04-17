import { blogs, blogValues } from "@/data/blogs"


export const fetchBlogs = async () => {
    return new Promise<blogValues[]>(
        resolve=>resolve(blogs))
}