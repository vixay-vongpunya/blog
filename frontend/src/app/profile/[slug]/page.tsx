import { getPostsByAuthor } from "@/api/user"
import ProfilePanel from "@/features/profile/components/ProfilePanel"
import { PageProvider } from "@/providers/PageProviders"
import { Page } from "@/providers/PageProviders/hook"
import { getQueryClient } from "@/utils/query-client"

type AccountProps = {
    params: Promise<{slug: string}>
}
const Account = async({params}: AccountProps) => {
    const queryClient = getQueryClient()
    const {slug} = await params
    const userId = slug.split('-').pop()
    if(!userId){
        return <>loading</>
    }

    queryClient.prefetchQuery({
        queryKey: ["user-posts", {userId}],
        queryFn: async()=>{
            return await getPostsByAuthor(userId)
        }
    })
    return (
        <PageProvider page={Page.Profile}>
            <ProfilePanel userId={userId}/>
        </PageProvider>)
}

export default Account