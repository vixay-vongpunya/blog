import ProfileFollowing from "@/features/profile/components/ProfileFollowing"
import { getAccount, getPostsByAuthor } from "@/features/profile/hooks/fetcher"
import { PageProvider } from "@/providers/PageProviders"
import { Page } from "@/providers/PageProviders/hook"
import { getQueryClient } from "@/utils/query-client"

type AccountProps = {
    params: Promise<{slug: string}>
}

const Following = async({params}: AccountProps) => {
    const {slug} = await params
    const userName = slug?.split('/')[0]

    return (
        <PageProvider page={Page.Profile}>
            {/* <Profile userName={userName}/> */}
            <ProfileFollowing userName={userName}/>
        </PageProvider>)
}

export default Following