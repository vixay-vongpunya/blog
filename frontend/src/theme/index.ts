import { ThemeOptions } from "@mui/material";
import { THEME } from "./constant";
import { FONT_COLORS } from "./tokens";


export const baseOptions: ThemeOptions = {
    typography: {
        fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',

    },
    components:{
        MuiTextField:{
            styleOverrides: {
                root:{
                    variants:[{
                        props: {
                            size: 'small'
                        },
                        style:{
                            padding: '8px 12px'
                        }
                    }]
            
                }
            }
        },
        MuiButtonBase:{
            defaultProps:{
                disableRipple: true,
            }
        },
        MuiButton:{
            styleOverrides:{
                root:({theme})=>({
                    boxShadow: "none",
                    textTransform: "none"
                }),
            }
        }
    }

}

export const themeOptions: Record<string, ThemeOptions> = {
    [THEME.LIGHT]: {
        ...baseOptions,
        palette: {
            primary: {
                main: FONT_COLORS.light.primary
            },
            secondary:{
                main: FONT_COLORS.light.secondary
            }
        },
        components:{
            MuiButton: {
                styleOverrides:{
                    root: {
                        
                    }
                }
            },
            MuiCard: {

            },
            MuiTypography: {
                styleOverrides:{
                    root: {                        

                    }
                }
            },

        }

    },
    [THEME.DARK]:{
        ...baseOptions,
        components: {
            MuiTypography: {
                styleOverrides:{
                    root: {
                        '&.MuiTypography-colorPrimary': {
                            color: FONT_COLORS.light.primary
                        },
                        '&.MuiTypography-colorSecondary': {
                            color: FONT_COLORS.light.secondary
                        },

                    }
                }
            }
        }

    }
}