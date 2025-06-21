import ProfileCard from "@/features/profile/components/ProfileCard"
import ProfilePostList from "@/features/profile/components/ProfilePostList"
import { getAccount } from "@/features/profile/hooks/fetcher"
import { PageProvider } from "@/providers/PageProviders"
import { Page } from "@/providers/PageProviders/hook"
import { getQueryClient } from "@/utils/query-client"

type AccountProps = {
    params: Promise<{slug: string}>
}
const Account = async({params}: AccountProps) => {
    const {slug} = await params
    const userName = slug?.split('/')[0]
    const queryClient = getQueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['account'],
        queryFn: () => getAccount(userName)
    })

    return (
        <PageProvider page={Page.Profile}>
            <ProfileCard userName={userName}/>
        </PageProvider>)
}

export default Account