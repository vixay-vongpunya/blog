'use client';

import PageHeader from "@/layouts/PageHeader/PageHeader"
import PageFooter from "@/layouts/PageFooter";
import { PageProvider } from "@/providers/PageProviders"
import { Page } from "@/providers/PageProviders/hook"
import { ProtectedRoutes } from "@/utils/ProtectedRoutes";
import { ReactNode } from "react"


const HomeLayout = ({children}:Readonly<{children: ReactNode}>) => {
    return(
    <PageProvider page={Page.Home}>
        <ProtectedRoutes>
            <PageHeader/>
            {children}
            <PageFooter/>
        </ProtectedRoutes>
       
    </PageProvider>)
}

export default HomeLayout