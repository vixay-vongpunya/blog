import { createContext, ReactNode, useContext, useEffect, useState } from "react"
type userProps = {
    id: string,
    name: string,
    email: string,
}

type AuthContextProps = {
    authenticated: boolean,
    user: userProps | undefined,
    login: (user: userProps)=>void,
    logout: ()=>void
}

const AuthContext = createContext<AuthContextProps>({authenticated: false, user:undefined, login: ()=>{}, logout:()=>{}})

export const AuthProvider = ({children}:{children: ReactNode}) => {
    const [authenticated, setAuthenticated]  = useState<boolean>(JSON.parse(window.localStorage.getItem('blog-auth') ?? 'false'))
    const [user, setUser] = useState<userProps | undefined>(undefined)
    
    const login = (user: userProps) => {
        window.localStorage.setItem('blog-auth', 'true')
        setAuthenticated(true)
        setUser(user)
    }

    const logout = () => {
        window.localStorage.setItem('blog-auth', 'false')
        setAuthenticated(false)
        setUser(undefined)
    }
    return (<AuthContext.Provider value={{authenticated, user, login, logout}}>
        {children}
    </AuthContext.Provider>)
}

export const useAuth = () => useContext(AuthContext)