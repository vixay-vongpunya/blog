import PageHeader from "@/layouts/PageHeader/PageHeader"
import { ReactNode } from "react"


const AccountLayout = ({children}:Readonly<{children: ReactNode}>) => {
    return(
        <>
            <PageHeader/>
            {children}
        </>
        )
}

export default AccountLayout