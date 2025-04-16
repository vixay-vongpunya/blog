'use client';

import NavBar from "@/layouts/NavBar"
import { PageProvider } from "@/providers/PageProviders"
import { Page } from "@/providers/PageProviders/hook"
import { ProtectedRoutes } from "@/utils/ProtectedRoutes";
import { ReactNode } from "react"


const HomeLayout = ({children}:Readonly<{children: ReactNode}>) => {
    return(
    <PageProvider page={Page.Home}>
        <ProtectedRoutes>
            <NavBar/>
            {children}
        </ProtectedRoutes>
       
    </PageProvider>)
}

export default HomeLayout