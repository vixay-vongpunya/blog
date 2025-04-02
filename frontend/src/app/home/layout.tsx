'use client';

import NavBar from "@/layouts/NavBar"
import { PageProvider } from "@/providers/PageProviders"
import { Page } from "@/providers/PageProviders/hook"
import { ReactNode } from "react"


const HomeLayout = ({children}:Readonly<{children: ReactNode}>) => {
    return(
    <PageProvider page={Page.Home}>
        <NavBar/>
        {children}
    </PageProvider>)
}

export default HomeLayout