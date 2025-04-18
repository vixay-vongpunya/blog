import { LogOutIcon, ProfileIcon, SettingsIcon } from "@/components/Icons/CustomIcons";
import { LogOut } from "@/features/authentication/hooks/fetcher";
import { gray } from "@/providers/theme/themePrimitives";
import { alpha, Divider, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Stack, Switch, Typography, useColorScheme } from "@mui/material";
import { useState } from "react";

export function ColorModeSwitch() {
    const { mode, setMode } = useColorScheme();
    if (!mode) {
      return null;
    }
    return (
        <Stack direction='row' sx={{
            alignItems: 'center',
            '& .MuiSwitch-switchBase.Mui-checked': {
                color: gray[400],
                '&:hover': {
                backgroundColor: alpha(gray[400], 0.2),
                },
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: gray[400],
            },
        }}>
            <Switch
                size='small'
                checked={mode === 'light' ? true : false}
                onChange={() =>{
                setMode((mode === 'light' ? 'dark' : 'light') as 'light' | 'dark')
                    }
                }>
            </Switch>
            <Typography color='text.secondary'>{mode === 'light' ? 'Light' : 'Dark'}</Typography>

        </Stack>
      
    );
}

type ProfileMenuProps ={
    open: boolean,
    onClose: ()=>void
    anchorEl: any
}

function ProfileMenu({open, onClose, anchorEl}:ProfileMenuProps){
    return(
        <Menu
            open={open}
            onClose={onClose}
            anchorEl={anchorEl}
            transformOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            autoFocus={false}
            slotProps={{
                paper:{
                    sx:{
                        width:220,
                    }
                }
            }}
            sx={{
                marginTop: '1em',
            }}
            >
            <MenuItem>
                <ListItemIcon>
                    <ProfileIcon/>                    
                </ListItemIcon>
                <ListItemText>
                    <Typography color='text.secondary'>
                        Profile
                    </Typography>
                </ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <SettingsIcon/>                    
                </ListItemIcon>
                <ListItemText>
                    <Typography color='text.secondary'>
                        Settings
                    </Typography>
                </ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemText>
                    <ColorModeSwitch/> 
                </ListItemText>
            </MenuItem>
            <Divider sx={{width:'90%', margin: 'auto'}}/>
            <MenuItem>
                <ListItemText>
                    <Typography color='text.secondary'>
                        Manage Publications
                    </Typography>
                </ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemText>
                    <Typography color='text.secondary'>
                        Help
                    </Typography>
                </ListItemText>
            </MenuItem>
            <Divider sx={{width:'90%', margin: 'auto'}}/>
            <MenuItem onClick={()=>LogOut()}>
                <ListItemIcon>
                    <LogOutIcon/>                    
                </ListItemIcon>
                <ListItemText>
                    <Typography color='text.secondary'>
                        Log out
                    </Typography>
                </ListItemText>
            </MenuItem>
        </Menu>
    )
}

export default ProfileMenu;