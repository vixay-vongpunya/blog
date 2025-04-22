
import { useAuth } from "@/providers/AuthProvider";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";


export const ProtectedRoutes = ({children}: {children: ReactNode}) =>{
    const {authenticated} = useAuth();
    const router = useRouter()

    useEffect(()=>{
        console.log(authenticated)
        if(!authenticated){
            router.push(PagePath[Page.Login])
        }
    },[authenticated])

    // to prevent the protected content renders momentary before re-direct happens
    if (!authenticated){
        return null
    }
    
    return children
}