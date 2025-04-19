"use client";

import MainLayout from "@/layouts/MainLayout";
import PageFooter from "@/layouts/PageFooter";
import PageHeader from "@/layouts/PageHeader/PageHeader";
import { PageProvider } from "@/providers/PageProviders";
import { Page } from "@/providers/PageProviders/hook";
import { ReactNode } from "react";

const PostLayout = ({children}:Readonly<{children: ReactNode}>)=>{
    return(
        <PageProvider page={Page.Post}>
            <PageHeader/>
            <MainLayout>
                {children}
            </MainLayout>
            <PageFooter/>
        </PageProvider>
    )
}

export default PostLayout;