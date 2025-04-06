"use client";

import PageFooter from "@/layouts/PageFooter";
import { PageProvider } from "@/providers/PageProviders";
import { Page } from "@/providers/PageProviders/hook";
import { ReactNode } from "react";

const PostLayout = ({children}:Readonly<{children: ReactNode}>)=>{
    return(
        <PageProvider page={Page.Post}>
            {children}
            <PageFooter/>
        </PageProvider>
    )
}

export default PostLayout;