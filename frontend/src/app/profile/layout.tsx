import PageHeader from "@/layouts/PageHeader/PageHeader"
import { PageProvider } from "@/providers/PageProviders"
import { Page } from "@/providers/PageProviders/hook"
import { ReactNode } from "react"
import MainLayout from "@/layouts/MainLayout";


const AccountLayout = ({children}:Readonly<{children: ReactNode}>) => {
    return(
        <>
            <PageHeader/>
            {children}
        </>)
}

export default AccountLayout