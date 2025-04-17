'use client';

import NavBar from "@/layouts/Navigation/NavBar/NavBar"
import { PageProvider } from "@/providers/PageProviders"
import { Page } from "@/providers/PageProviders/hook"
import { ReactNode } from "react"


const LogInLayout = ({children}:Readonly<{children: ReactNode}>) => {
    return(
    <PageProvider page={Page.Login}>
        {children}
    </PageProvider>)
}

export default LogInLayout