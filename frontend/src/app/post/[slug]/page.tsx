import { getPostById } from "@/api/post"
import Post from "@/features/post/components/Post"
import { PageProvider } from "@/providers/PageProviders"
import { Page } from "@/providers/PageProviders/hook"
import { getQueryClient } from "@/utils/query-client"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

const PostPage = async ({params}:{params: Promise<{slug: string}>}) => {
    // need to deal with this
    const queryClient = getQueryClient()
    const {slug} = await params
    const postId = slug.split('-').pop()
    if(!postId){
        return<>loading...</>
    }
    queryClient.prefetchQuery({
        queryKey: ["post", {postId}],
        queryFn: async()=>{
            return await getPostById(postId)
        }
    })

    return(
        <PageProvider page={Page.Post}>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Post postId={postId}/>
            </HydrationBoundary>
        </PageProvider>
    )
}

export default PostPage