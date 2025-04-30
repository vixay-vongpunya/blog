import MainLayout from "@/layouts/MainLayout";
import PageFooter from "@/layouts/PageFooter";
import PageHeader from "@/layouts/PageHeader/PageHeader";
import { PageProvider } from "@/providers/PageProviders";
import { Page } from "@/providers/PageProviders/hook";
import { ReactNode } from "react";

const TagLayout = ({children}:Readonly<{children: ReactNode}>)=>{
    return(
        <PageProvider page={Page.Category}>
            <PageHeader/>
            <MainLayout>
                {children}
            </MainLayout>
            <PageFooter/>
        </PageProvider>
    )
}

export default TagLayout;