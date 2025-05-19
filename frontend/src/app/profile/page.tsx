import ProfilePanel from "@/features/profile/components/ProfilePanel"
import { PageProvider } from "@/providers/PageProviders"
import { Page } from "@/providers/PageProviders/hook"


const Account = () => {
    return (
        <PageProvider page={Page.Profile}>
            <ProfilePanel/>
        </PageProvider>)
}

export default Account