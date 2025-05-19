// 'use client'
// import { createContext, useContext, ReactNode} from 'react'
// import { useGetSelf } from '@/features/authentication/hooks/query'
// import { User } from '@/domains/user/types'

// type UserContextProps = {
//     user: User | undefined,
// }

// const UserContext = createContext<UserContextProps>({
//     user: undefined,
// })

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//     const { data: user} = useGetSelf()

//     if (!user) return <div>Loading...</div>

//     return (
//     <UserContext.Provider value={{ user }}>
//         {children}
//     </UserContext.Provider>
//     )
// }

// export const useUser = () => useContext(UserContext)