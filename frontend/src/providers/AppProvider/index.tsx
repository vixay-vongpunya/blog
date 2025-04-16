"use client"
import { AuthProvider } from "../AuthProvider"
import { SnackbarProvider} from "../SnackbarProvder"

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import AppThemeProvider from "../theme/AppTheme"

type AppProviderProps = {
    children: React.ReactNode,
}

export const AppProvider = ({children}:AppProviderProps) => {
    const queryClient = new QueryClient()
    return(
        <QueryClientProvider client={queryClient}>
                <AppThemeProvider>
                    <AuthProvider>
                        <SnackbarProvider>
                            {children}     
                        </SnackbarProvider>
                    </AuthProvider>
                </AppThemeProvider>
        </QueryClientProvider>    
    )
}