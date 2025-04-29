import { ReactNode, useMemo } from "react";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { colorSchemes, shadows, shape, typography } from "./themePrimitives";
import { inputsCustomizations } from "./customizations/inputs";
import { CssBaseline } from "@mui/material";
import { containersCustomizations } from "./customizations/containers";

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
                ...containersCustomizations,
            }
        })
    },[])

    return(
        <ThemeProvider theme={theme}>
            {/* need to import CssbaseLin to modify background color */}
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )
} 