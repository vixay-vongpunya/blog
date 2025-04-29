import { Components, Theme } from "@mui/material";

export const containersCustomizations: Components<Theme> = {
    MuiCardContent:{
        styleOverrides:{
            root:{
                padding: 0,
                paddingTop: '1em'
            }
        }
    },
    MuiCardActions:{
        styleOverrides:{
            root:{
                padding: 0,
            }
        }
    }
}