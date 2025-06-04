import ProfileDetail from "@/features/profile/components/ProfileDetail"
import { getAccount } from "@/features/profile/hooks/fetcher"
import PageHeader from "@/layouts/PageHeader/PageHeader"
import SecondLayout from "@/layouts/SecondaryLayout"
import { getQueryClient } from "@/utils/query-client"
import { ReactNode } from "react"


const AccountLayout = async({children, params}:Readonly<{children: ReactNode, params: Promise<{slug: string}>}>) => {
    const queryClient = getQueryClient()
    const {slug} = await params
    const userName = slug?.split('/')[0]

    await queryClient.prefetchQuery({
        queryKey: ['account'],
        queryFn: () => getAccount(userName)
    })

    return(
        <>
            <PageHeader/>
            <SecondLayout 
                rightSection={<ProfileDetail userName={userName}/>} 
                leftSection={children}/>
       
        </>
        )
}

export default AccountLayout