// "use client"

// import { THEME } from "@/theme/constant";
// import { useLocalStorage } from "./hook";
// import { createContext } from "react";
// import { createTheme, ThemeProvider } from "@mui/material";
// import { themeOptions } from "@/theme";


// interface ApplicationConfigsContextInterface {
//     theme: THEME,
// }

// export const defaultThemeContext: ApplicationConfigsContextInterface = {
//     theme: THEME.LIGHT
// }

// export const ThemeContext = createContext(defaultThemeContext);

// export const ThemeContextProvider= ({children}: {children: React.ReactNode}) => {
//     const defaultConfig = {
//         theme: THEME.LIGHT
//     }

//     const [config,] = useLocalStorage("config", defaultConfig);

//     const darkTheme = createTheme(themeOptions[THEME.DARK])

//     const lightTheme = createTheme(themeOptions[THEME.LIGHT]);

//     return (
//         <ThemeContext.Provider value={config}>
//             <ThemeProvider theme={lightTheme}>
//                 {children}
//             </ThemeProvider>
           
//         </ThemeContext.Provider>
//     )
// }