'use client'

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
    const queryClient = new QueryClient({
        defaultOptions:{
            queries:{
                staleTime: 500,
            }
        }
    })

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