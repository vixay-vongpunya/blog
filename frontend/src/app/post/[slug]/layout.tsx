import MainLayout from "@/layouts/MainLayout";
import PageFooter from "@/layouts/PageFooter";
import PageHeader from "@/layouts/PageHeader/PageHeader";
import { ReactNode } from "react";

const PostLayout = ({children}:Readonly<{children: ReactNode}>)=>{
    return(
        <>
        <PageHeader/>
            <MainLayout>
                {children}
            </MainLayout>
        <PageFooter/>
        </>
            
    )
}

export default PostLayout;