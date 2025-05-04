import PageHeader from "@/layouts/PageHeader/PageHeader"
import PageFooter from "@/layouts/PageFooter";
import { PageProvider } from "@/providers/PageProviders"
import { Page } from "@/providers/PageProviders/hook"
import { ReactNode } from "react"
import MainLayout from "@/layouts/MainLayout";

const HomeLayout = ({children}:Readonly<{children: ReactNode}>) => {
    return(
        <>
            <PageHeader/>
                <MainLayout>
                    {children}
                </MainLayout>
            <PageFooter/>
        </>)
}

export default HomeLayout