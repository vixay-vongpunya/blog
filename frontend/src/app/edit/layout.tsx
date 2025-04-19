'use client';

import { PageProvider } from "@/providers/PageProviders"
import { Page } from "@/providers/PageProviders/hook"
import { ReactNode} from "react"


const EditLayout = ({children}:Readonly<{children: ReactNode}>) => {
    return(
    <PageProvider page={Page.Edit}>
        {children}
    </PageProvider>)
}

export default EditLayout