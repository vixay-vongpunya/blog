'use client';

import PageHeader from "@/layouts/PageHeader/PageHeader";
import { PageProvider } from "@/providers/PageProviders"
import { Page } from "@/providers/PageProviders/hook"
import { ReactNode } from "react"


const HomeLayout = ({children}:Readonly<{children: ReactNode}>) => {
    return(
    <PageProvider page={Page.Write}>
        <PageHeader/>
        {children}
    </PageProvider>)
}

export default HomeLayout