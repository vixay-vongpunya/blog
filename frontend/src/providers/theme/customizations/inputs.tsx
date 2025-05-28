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
    MuiToggleButtonGroup:{
        styleOverrides:{
            root:({theme})=>({
                padding: 0,
                '& > :not(:first-child)' : {
                    borderLeft: `1px solid ${theme.palette.divider}`
                }
            })
        }
    },
    MuiToggleButton:{
        styleOverrides:{
            root:({theme})=>({
                textTransform: 'none',
                border: 'none',
                color: theme.palette.text.secondary,
                '&.Mui-selected': {
                    backgroundColor: 'transparent',
                    //setting this using theme.palette will default to light mode all the time?
                    color: 'text.primary',
                },
                '&:hover': {
                    backgroundColor: 'transparent',
                },
                '&.Mui-selected: hover': {
                    backgroundColor: 'transparent',
                },
            })
        }
    },
    MuiInputBase:{
        styleOverrides:{
            root:{
                border: 'none'
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