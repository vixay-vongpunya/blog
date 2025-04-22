'use client'
import { useGetSelf } from "@/features/authentication/hooks/query"
import { useRouter } from "next/navigation"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { Page, PagePath } from "../PageProviders/hook"
import { useFetchCategory } from "@/utils/globalQuery"
import { atom, useSetAtom } from "jotai"

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

export const initialData = atom<any>(undefined)

const AuthContext = createContext<AuthContextProps>({
    authenticated: false,
    user: undefined,
    login: () => {},
    logout: () => {}
})

export const AuthProvider = ({children}:{children: ReactNode}) => {
    const router = useRouter()
    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const [user, setUser] = useState<User | undefined>(undefined)
    const {data, isSuccess} = useGetSelf()
    const {data : initialCategory, isSuccess: secondSuccess} = useFetchCategory()
    const setInitialAtom = useSetAtom(initialData)

    useEffect(() => {
        const authFromStorage = localStorage.getItem('blog-auth')
        setAuthenticated(JSON.parse(authFromStorage ?? 'false'))
    }, [])

    useEffect(() => {
        if (secondSuccess) {
            setInitialAtom(initialCategory)
        }
    }, [secondSuccess, initialCategory])

    useEffect(() => {
        if (isSuccess) {
            setUser(data)
        }
    }, [isSuccess, data])

    const login = (user: User) => {
        localStorage.setItem('blog-auth', 'true')
        setAuthenticated(true)
        setUser(user)
    }

    const logout = () => {
        localStorage.setItem('blog-auth', 'false')
        setAuthenticated(false)
        setUser(undefined)
        router.push(PagePath[Page.Login])
    }

    return (
        <AuthContext.Provider value={{authenticated, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
