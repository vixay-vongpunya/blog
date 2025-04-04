"use client";

import { PageProvider } from "@/providers/PageProviders";
import { Page } from "@/providers/PageProviders/hook";
import { ReactNode } from "react";

const PostLayout = ({children}:Readonly<{children: ReactNode}>)=>{
    return(
        <PageProvider page={Page.Post}>
            {children}
        </PageProvider>
    )
}

export default PostLayout;