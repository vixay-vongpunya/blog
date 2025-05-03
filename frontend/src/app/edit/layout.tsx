import { ReactNode} from "react"

const EditLayout = ({children}:Readonly<{children: ReactNode}>) => {
    return(
        <>
            {children}
        </>
    )
}

export default EditLayout