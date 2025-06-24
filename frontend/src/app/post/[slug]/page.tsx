import Post from "@/features/post/components/Post"
import { getPostById } from "@/features/post/hooks/fetcher"
import { PageProvider } from "@/providers/PageProviders"
import { Page } from "@/providers/PageProviders/hook"
import { getQueryClient } from "@/utils/query-client"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

const PostPage = async ({params}:{params: Promise<{slug: string}>}) => {
    // need to deal with this
    const queryClient = getQueryClient()
    const {slug} = await params

    if(!slug){
        return<>loading...</>
    }
    console.log(slug)

    queryClient.prefetchQuery({
        queryKey: ["post", {slug}],
        queryFn: async()=>{
            return await getPostById(slug)
        }
    })
    
    return(
        <PageProvider page={Page.Post}>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Post postId={slug}/>
            </HydrationBoundary>
        </PageProvider>
    )
}

export default PostPage