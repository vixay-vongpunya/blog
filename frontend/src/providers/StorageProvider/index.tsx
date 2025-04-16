// "use client"
// import { Theme } from "@mui/material";
// import { useCallback, useContext, createContext } from "react";
// import { useLocalStorage } from "../stale/hook";
// import { THEME } from "@/providers/theme/constant";


// interface ApplicationConfigsProps{
//     children: React.ReactNode;
// }

// interface ApplicationConfigsConTextInterface{
//     theme: THEME,
//     changeTheme: (theme : THEME) => void;
// }


// export const defaultApplicationConfigsContext: ApplicationConfigsConTextInterface = {
//     theme: THEME.LIGHT,
//     changeTheme: (theme: THEME) => {}
// }

// export const ApplicationConfigsContext = createContext(defaultApplicationConfigsContext);

// const useApplicationConfigs = () => useContext(ApplicationConfigsContext);

// const ApplicationConfigs = ({children}: ApplicationConfigsProps) => {
//     const defaultConfig = {
//         theme: THEME.LIGHT
//     }

//     const [config, setConfig] = useLocalStorage("config", defaultConfig);

//     const changeTheme = useCallback(
//     (theme: THEME) => {
//         setConfig({...config, theme})
//     },[config.theme]);

//     return(
//         <ApplicationConfigsContext.Provider value = {{theme: config.theme, changeTheme}}>
//             {children}            
//         </ApplicationConfigsContext.Provider>

//     )
// }

// export {ApplicationConfigs, useApplicationConfigs}