'use client'

import { SnackbarProvider} from "../SnackbarProvder"
import {
    isServer,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import AppThemeProvider from "../theme/AppTheme"
import { getQueryClient } from "@/utils/query-client"
type AppProviderProps = {
    children: React.ReactNode,
}



export const AppProvider = ({children}:AppProviderProps) => {
    const queryClient = getQueryClient()

    return(
        <QueryClientProvider client={queryClient}>
            <AppThemeProvider>
                <SnackbarProvider>
                    {children}     
                </SnackbarProvider>
            </AppThemeProvider>
        </QueryClientProvider>    
    )
}