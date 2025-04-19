"use client";
import { Box, Button, Card, CardContent, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Stack, TextField, Typography } from '@mui/material';
import { useLogInForm } from '../../hooks/login-in-form';
import AuthenticationBaseCard from '../AuthenticationBaseCard';
import { useRouter } from 'next/navigation';
import { Page, PagePath } from '@/providers/PageProviders/hook';

function LogInCard(){
    const {logInFormValue, logInFormErrors, dispatchLogInFormValue, onSubmit} = useLogInForm()
    const router = useRouter()
    const content = (
        <Box  sx={{display: 'flex', flexDirection: 'column', gap:2}}>
            <Typography component='h1' fontWeight='bold' variant='h4' color='text.primary' sx={{width:'100%'}}>Log in</Typography>
            <FormControl>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <TextField 
                    id = 'email'
                    placeholder = '@email.com'
                    autoComplete='email'
                    value = {logInFormValue.email}
                    onChange ={(e)=>dispatchLogInFormValue({type: 'email', payload: e.target.value})}
                    fullWidth
                    size='small'
                    />
                {
                    logInFormErrors?.email && (
                        <FormHelperText sx={{color: 'red'}}>{logInFormErrors.email}</FormHelperText>
                    )
                }
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <TextField 
                    id = 'password'
                    type = 'password'
                    placeholder = '••••••'
                    value = {logInFormValue.password}
                    onChange ={(e)=>dispatchLogInFormValue({type: 'password', payload: e.target.value})}
                    fullWidth
                    size='small'
                    />
                {
                    logInFormErrors?.password && (
                        <FormHelperText sx={{color: 'red'}}>{logInFormErrors.password}</FormHelperText>
                    )
                }
            </FormControl>
            <Stack>
                <Button  variant='contained' onClick={onSubmit} sx={{textTransform: "none"}} >Sign up</Button>
                <Typography alignSelf='center' 
                sx={{marginTop: '0.5em'}}>
                    Already have an account? 
                    <span onClick={()=>router.push(PagePath[Page.Login])} 
                    className='underline pl-2 cursor-pointer'> Sign up</span></Typography>
            </Stack>
        </Box>

    )
    return(
        <AuthenticationBaseCard content={content}/>
    )
}

export default LogInCard;