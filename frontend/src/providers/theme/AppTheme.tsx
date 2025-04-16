import { ReactNode, useMemo } from "react";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { colorSchemes, shadows, shape, typography } from "./themePrimitives";
import { inputsCustomizations } from "./customizations/inputs";

export default function AppThemeProvider({children}:{children: ReactNode}){
    const theme = useMemo(()=>{
        return createTheme({
            cssVariables: {
                colorSchemeSelector: 'data-mui-color-scheme',
                cssVarPrefix: 'template',
              },
            colorSchemes,
            typography,
            shadows,
            shape,
            components:{
                ...inputsCustomizations,
            }
        })
    },[])

    return(
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
} 