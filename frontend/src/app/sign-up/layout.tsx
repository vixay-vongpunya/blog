"use client";
import { PageProvider } from "@/providers/PageProviders";
import { Page } from "@/providers/PageProviders/hook";
import { ReactNode } from "react";

const SignUpLayout = ({children}:Readonly<{children:ReactNode}>)=>{
    return(
        <PageProvider page={Page.SignUp}>
            {children}
        </PageProvider>
        
    )
}

export default SignUpLayout;