import { Components, outlinedInputClasses, Theme } from "@mui/material";
import { brand, gray } from "../themePrimitives";


export const inputsCustomizations: Components<Theme> = {
    MuiButtonBase: {
        defaultProps: {
            disableRipple: true,
            disableTouchRipple: true,
        }
    },
    MuiButton: {
        styleOverrides:{
            root: ({theme})=>({
                borderRadius: theme.shape.borderRadius,
                textTransform: 'none',
                variants: [
                    {
                        props:{
                            color: 'primary',
                            variant: 'contained'
                        },
                        style:{
                            color: 'white',
                            backgroundColor: gray[900],
                            ...theme.applyStyles('dark',{
                                color: 'black',
                                backgroundColor: gray[50],
                            })
                        }
                    },
                    {
                        props:{
                            variant: 'outlined',
                        },
                        style:{
                            color: theme.palette.text.primary,
                            borderColor: gray[200],
                            ...theme.applyStyles('dark',{
                                color: gray[50],
                            })
                        }
                    }
                ]
            })
        }
    },
    MuiInputBase:{
        styleOverrides:{
            root:{
                border: 'none',
                
            }
        }
    },
    MuiOutlinedInput:{
        styleOverrides:{
            root: ({theme})=>({
                border: `1px solid ${brand[100]}`,
                '&:focus':{
                    borderColor: 'white'
                },
                [`&.${outlinedInputClasses.focused}`]: {
                    outline: `1px solid ${brand[100]}`,
                    borderColor: brand[100],
                  },
            })
        }
    },
    MuiTextField:{
        styleOverrides:{
            root:{
                outline: 'none',
                border: 'none',
                '&:focus':{
                    outline: 'none',

                }
            }
        }
    }
}