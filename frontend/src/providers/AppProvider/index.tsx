import { ApplicationConfigs } from "../StorageProvider"
import { ThemeContextProvider } from "../ThemeProvider"

type AppProviderProps = {
    children: React.ReactNode,
}

export const AppProvider = ({children}:AppProviderProps) => {
    return(
        <ApplicationConfigs>
            <ThemeContextProvider>
                  {children}     
            </ThemeContextProvider>          
        </ApplicationConfigs>
    )
}