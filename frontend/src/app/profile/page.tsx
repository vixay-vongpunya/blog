import ProfilePanel from "@/features/profile/ProfilePanel"
import { UserProvider } from "@/providers/UserProvider"
import { PageProvider } from "@/providers/PageProviders"
import { Page } from "@/providers/PageProviders/hook"


const Account = () => {
    return (
        <PageProvider page={Page.Profile}>
            <UserProvider>
                <ProfilePanel/>
            </UserProvider>
        </PageProvider>)
}

export default Account