import { useGetSelf } from "@/features/authentication/hooks/query"
import { useRouter } from "next/navigation"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { Page, PagePath } from "../PageProviders/hook"
export type User = {
    id: string,
    name: string,
    email: string,
}

type AuthContextProps = {
    authenticated: boolean,
    user: User | undefined,
    login: (user: User)=>void,
    logout: ()=>void
}

const AuthContext = createContext<AuthContextProps>({authenticated: false, user:undefined, login: ()=>{}, logout:()=>{}})

export const AuthProvider = ({children}:{children: ReactNode}) => {
    // lazy initializatoin
    const [authenticated, setAuthenticated]  = useState<boolean>(()=>
        // ssf safety
        typeof window !== undefined ? JSON.parse(window.localStorage.getItem('blog-auth') ?? 'false') : false)
    const [user, setUser] = useState<User | undefined>(undefined)
    const {data, isSuccess} = useGetSelf()
    const router = useRouter()

    useEffect(()=>{
        if(isSuccess){
            setUser(data)
            console.log("hey",data)
        }
    },[isSuccess, data])
    
    
    const login = (user: User) => {
        window.localStorage.setItem('blog-auth', 'true')
        setAuthenticated(true)
        setUser(user)
    }

    const logout = () => {
        window.localStorage.setItem('blog-auth', 'false')
        setAuthenticated(false)
        setUser(undefined)
        router.push(PagePath[Page.Login])
    }
    return (<AuthContext.Provider value={{authenticated, user, login, logout}}>
        {children}
    </AuthContext.Provider>)
}

export const useAuth = () => useContext(AuthContext)