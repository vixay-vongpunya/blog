

import PageHeader from "@/layouts/PageHeader/PageHeader"
import { ReactNode } from "react"
import SecondaryLayout from "@/layouts/SecondaryLayout";


const SearchLayout = ({children}:Readonly<{children: ReactNode}>) => {
    return(
        <>
            <PageHeader/>
            <SecondaryLayout>
                {children}
            </SecondaryLayout>
        </>
        )
}

export default SearchLayout