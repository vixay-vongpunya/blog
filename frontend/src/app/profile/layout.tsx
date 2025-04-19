'use client';

import PageHeader from "@/layouts/PageHeader/PageHeader"
import PageFooter from "@/layouts/PageFooter";
import { PageProvider } from "@/providers/PageProviders"
import { Page } from "@/providers/PageProviders/hook"
import { ProtectedRoutes } from "@/utils/ProtectedRoutes";
import { ReactNode } from "react"
import MainLayout from "@/layouts/MainLayout";


const AccountLayout = ({children}:Readonly<{children: ReactNode}>) => {
    return(
    <PageProvider page={Page.Profile}>
        <ProtectedRoutes>
            <PageHeader/>
            <MainLayout>
                {children}
            </MainLayout>
        </ProtectedRoutes>
       
    </PageProvider>)
}

export default AccountLayout