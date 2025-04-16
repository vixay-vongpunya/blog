import { createContext, ReactNode, useContext, useState } from "react"
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
    const [authenticated, setAuthenticated]  = useState<boolean>(false)
    const [user, setUser] = useState<userProps | undefined>(undefined)

    const login = (user: userProps) => {
        setAuthenticated(true)
        setUser(user)
    }

    const logout = () => {
        setAuthenticated(false)
        setUser(undefined)
    }
    return (<AuthContext.Provider value={{authenticated, user, login, logout}}>
        {children}
    </AuthContext.Provider>)
}

export const useAuth = () => useContext(AuthContext)