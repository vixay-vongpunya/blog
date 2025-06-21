import MainLayout from "@/layouts/MainLayout"
import PageHeader from "@/layouts/PageHeader/PageHeader"
import { ReactNode } from "react"


const AccountLayout = async({children}:Readonly<{children: ReactNode}>) => {
    
    return(
        <>
            <PageHeader/>
            <MainLayout>
                {children}
            </MainLayout>
        </>
        )
}

export default AccountLayout