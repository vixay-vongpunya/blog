import { LogOutIcon, ProfileIcon, SettingsIcon } from "@/components/Icons/CustomIcons";
import { useLogOutMutation } from "@/features/authentication/hooks/query";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import { gray } from "@/providers/theme/themePrimitives";
import { useGetSelfQuery } from "@/utils/hooks/user/query";
import { useMatchMedia } from "@/utils/useMatchMedia";
import { alpha, Box, Divider, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Stack, Switch, Typography, useColorScheme } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

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
                }/>
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
    const router = useRouter()
    const matchMedia = useMatchMedia()
    const {data: user} = useGetSelfQuery()
    const {mutate : logout}  = useLogOutMutation()

    if(!user) return

    const menuItems = [
        [
            {
                key: "profile",
                text: <Typography color='text.secondary'>Profile</Typography>,
                icon: <ProfileIcon/>,
                onClick: () => router.push(`${PagePath[Page.Profile]}/${user.name}?source=posts`)
            },
            {
                key: "setting",
                text: <Typography color='text.secondary'>Settings</Typography>,
                icon: <SettingsIcon/>,
                onClick: () => router.push(`${PagePath[Page.Profile]}/${user.name}/setting`)
            },
            {
                key: "colorModeSwitch",
                text: <ColorModeSwitch/>,
                icon: undefined,    
                onClick: () => {},
            },
        ],
        [
            matchMedia === "mobile" && {
                key: "edit",
                text: <Typography color='text.secondary'>Edit</Typography>,
                icon: undefined,
                onClick: () => router.push(PagePath[Page.Edit]),

            },
            {
                key: "managePublication",
                text: <Typography color='text.secondary'>Manage publications</Typography>,
                icon: undefined,
                onClick: () => {},
            },
            {
                key: "help",
                text: <Typography color='text.secondary'>Help</Typography>,
                icon: undefined,
                onClick: () => {}
            },
        ],
        [
            {
                key: "logOut",
                text: <Typography color='text.secondary'>Log out</Typography>,
                icon: <LogOutIcon/>,
                onClick: ()=>logout(),
            }
        ]
        
    ]

    //menu doenst accept react fragment so i make array
    const menuComponents = menuItems.flatMap((group, index)=>{
        //since i have mobile
        const filteredGroup = group.filter(Boolean)

        const items = filteredGroup.map((item:any)=>(
            <MenuItem key={item.key} onClick={item.onClick}>
                {
                    item.icon &&
                    <ListItemIcon>
                        {item.icon}                    
                    </ListItemIcon>
                }
                <ListItemText>
                    {item.text}
                </ListItemText>
            </MenuItem>
        ))

        if(menuItems.length !== index){
            items.push(<Divider key={`divider-${index}`} sx={{width:'90%', margin: 'auto'}}/>)
        }

        return items
    })
    
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
            {menuComponents}
        </Menu>
    )
}

export default ProfileMenu;