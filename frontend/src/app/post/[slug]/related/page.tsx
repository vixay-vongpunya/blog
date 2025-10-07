import RelatedPosts from "@/features/post/components/RelatedPostCard"
import { PageProvider } from "@/providers/PageProviders"
import { Page } from "@/providers/PageProviders/hook"
import { getQueryClient } from "@/utils/query-client"

const RelatedPage = async ({params}:{params: Promise<{slug: string}>}) => {
    // need to deal with this
    const queryClient = getQueryClient()
    const {slug} = await params
    const postId = slug.split("-").pop()

    if(!postId){
        return<>loading...</>
    }
    // console.log(slug)

    // queryClient.prefetchQuery({
    //     queryKey: ["post", {slug}],
    //     queryFn: async()=>{
    //         return await getPostById(slug)
    //     }
    // })
    
    return(
        <PageProvider page={Page.Post}>
            <RelatedPosts postId={postId}/>
        </PageProvider>
    )
}

export default RelatedPage