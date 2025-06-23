'use client'
import { Page, PagePath } from "@/providers/PageProviders/hook";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useGetSelfQuery } from "./hooks/user/query";

export const ProtectedRoutes = ({children}: {children: ReactNode}) =>{
    const {data: user, isLoading} = useGetSelfQuery()
    const router = useRouter()

    useEffect(()=>{
        if(!user && !isLoading){
            console.log("not allowed", user)
            router.push(PagePath[Page.Login])
        }
    },[user, isLoading])

    // to prevent the protected content renders momentary before re-direct happens
    if (user){
        return children
    }
}