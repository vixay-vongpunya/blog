import { Snackbar, Slide, SnackbarContent } from "@mui/material";
import React, { createContext, ReactNode, useContext, useState } from "react";

const SnackbarContext = createContext<(message: string)=> void>(()=>{})

export function SnackbarProvider({children}: {children: ReactNode}) {
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    
    const showSnackbar = (msg: string)=>{
        setMessage(msg)
        setOpen(true)
    }
    return (
        <SnackbarContext.Provider value={showSnackbar}>
            {children}
            <Snackbar
                open={open}
                onClose={()=>setOpen(false)}
                message={message}
                autoHideDuration={5000}/>
        </SnackbarContext.Provider>
            
        );
}

export const useSnackbar = () => useContext(SnackbarContext);
