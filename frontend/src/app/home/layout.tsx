import PageHeader from "@/layouts/PageHeader/PageHeader"
import PageFooter from "@/layouts/PageFooter";
import { ReactNode } from "react"
import MainLayout from "@/layouts/MainLayout";

const HomeLayout = ({children}:Readonly<{children: ReactNode}>) => {
    return(
        <>
            <PageHeader/>
            <MainLayout>
                {children}
            </MainLayout>
        </>)
}

export default HomeLayout