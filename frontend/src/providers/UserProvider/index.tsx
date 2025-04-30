'use client'
import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { useGetSelf } from '@/features/authentication/hooks/query'
import { User } from '@/domains/user/types'

type UserContextProps = {
    user: User | undefined,
    authenticated: boolean,
    logout: () => void
}

const UserContext = createContext<UserContextProps>({
    user: undefined,
    authenticated: false,
    logout: () => {}
})

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const { data: user, isLoading } = useGetSelf()

    const logout = () => {
    // document.cookie = 'auth-token=; Max-Age=0' 
    }

    if (isLoading) return <div>Loading...</div>

    return (
    <UserContext.Provider value={{ user, authenticated: !!user, logout }}>
        {children}
    </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)


    // import { useGetSelf } from "@/features/authentication/hooks/query"
    // import { useRouter } from "next/navigation"
    // import { createContext, ReactNode, useContext, useState } from "react"
    // import { Page, PagePath } from "../PageProviders/hook"
    // import { User } from "@/api/user"
    // import { cookies } from "next/headers"

    // type AuthContextProps = {
    //     authenticated: boolean,
    //     user: User | null,
    //     login: (user: User)=>void,
    //     logout: ()=>void
    // }

    // const AuthContext = createContext<AuthContextProps>({
    //     authenticated: false,
    //     user: null,
    //     login: () => {},
    //     logout: () => {}
    // })

    // export const AuthProvider = async({children}:{children: ReactNode}) => {
    //     const router = useRouter()
    //     const cookieStore = await cookies()
    //     const [authenticated, setAuthenticated] = useState<boolean>( Boolean(cookieStore.get('auth-token')?.value))
    //     const {data: userData} = useGetSelf()
    //     const [user, setUser] = useState<User | null>(userData)

    //     const login = (user: User) => {
    //         localStorage.setItem('blog-auth', 'true')
    //         setAuthenticated(true)
    //         setUser(user)
    //     }

    //     const logout = () => {
    //         localStorage.setItem('blog-auth', 'false')
    //         setAuthenticated(false)
    //         setUser(null)
    //         router.push(PagePath[Page.Login])
    //     }

    //     return (
    //         <AuthContext.Provider value={{authenticated, user, login, logout}}>
    //             {children}
    //         </AuthContext.Provider>
    //     )
    // }

    // export const useAuth = () => useContext(AuthContext)
