'use client';

import { PageProvider } from "@/providers/PageProviders"
import { Page } from "@/providers/PageProviders/hook"
import { ReactNode } from "react"


const HomeLayout = ({children}:Readonly<{children: ReactNode}>) => {
    return(
    <PageProvider page={Page.Write}>
        {children}
    </PageProvider>)
}

export default HomeLayout