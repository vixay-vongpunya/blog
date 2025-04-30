import Post from "@/features/post/components/Post"
import { PageProvider } from "@/providers/PageProviders"
import { Page } from "@/providers/PageProviders/hook"

const PostPage = async ({params}:{params: Promise<{slug: string}>}) => {
    // need to deal with this
    const {slug} = await params
    const postId = slug.split('-').pop()

    if(!postId){
        return<>loading...</>
    }
    
    return(
        <PageProvider page={Page.Post}>
            <Post postId={postId}/>
        </PageProvider>
    )
}

export default PostPage