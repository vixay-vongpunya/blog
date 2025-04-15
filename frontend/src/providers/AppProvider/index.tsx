"use client"
import { SnackbarProvider} from "../SnackbarProvder"
import { ApplicationConfigs } from "../StorageProvider"
import { ThemeContextProvider } from "../ThemeProvider"
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

type AppProviderProps = {
    children: React.ReactNode,
}

export const AppProvider = ({children}:AppProviderProps) => {
    const queryClient = new QueryClient()
    return(
        <QueryClientProvider client={queryClient}>
            <ApplicationConfigs>
                <ThemeContextProvider>
                    <SnackbarProvider>
                        {children}     
                    </SnackbarProvider>
                </ThemeContextProvider>
            </ApplicationConfigs>
        </QueryClientProvider>    
    )
}