"use client";
import { Box, Button, Card, CardContent, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Stack, TextField, Typography } from '@mui/material';
import { useSignUpForm } from '../../hooks/sign-up-form';
import AuthenticationBaseCard from '../AuthenticationBaseCard';
import { useRouter } from 'next/navigation';
import { Page, PagePath } from '@/providers/PageProviders/hook';


function SignUpCard(){
    const {signUpFormValue, signUpFormErrors, dispatchSignUpFormValue, onSubmit} = useSignUpForm()
    const router = useRouter()
    const content = (
        <Box  sx={{display: 'flex', flexDirection: 'column', gap:2}}>
             <Typography component='h1' fontWeight='bold' variant='h4' color='text.primary' sx={{width:'100%'}}>Sign up</Typography>
            <FormControl>
                <FormLabel htmlFor='name'>name</FormLabel>
                <TextField 
                    id = 'name'
                    placeholder = 'Enter your name'
                    autoComplete='name'
                    value = {signUpFormValue.name}
                    onChange ={(e)=>dispatchSignUpFormValue({type: 'name', payload: e.target.value})}
                    fullWidth
                    size='small'                         
                    />
                {
                    signUpFormErrors?.name && (
                        <FormHelperText sx={{color: 'red'}}>{signUpFormErrors.name}</FormHelperText>
                    )
                }
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <TextField 
                    id = 'email'
                    placeholder = '@email.com'
                    autoComplete='email'
                    value = {signUpFormValue.email}
                    onChange ={(e)=>dispatchSignUpFormValue({type: 'email', payload: e.target.value})}
                    fullWidth
                    size='small'
                    />
                {
                    signUpFormErrors?.email && (
                        <FormHelperText sx={{color: 'red'}}>{signUpFormErrors.email}</FormHelperText>
                    )
                }
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <TextField 
                    id = 'password'
                    type = 'password'
                    placeholder = '••••••'
                    value = {signUpFormValue.password}
                    onChange ={(e)=>dispatchSignUpFormValue({type: 'password', payload: e.target.value})}
                    fullWidth
                    size='small'
                    />
                {
                    signUpFormErrors?.password && (
                        <FormHelperText sx={{color: 'red'}}>{signUpFormErrors.password}</FormHelperText>
                    )
                }
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
                <TextField 
                    id = 'confirmPassword'
                    type = 'password'
                    placeholder = '••••••'
                    value = {signUpFormValue.confirmPassword}
                    onChange ={(e)=>dispatchSignUpFormValue({type: 'confirmPassword', payload: e.target.value})}
                    fullWidth
                    size='small'
                    />
                {
                    signUpFormErrors?.confirmPassword && (
                        <FormHelperText sx={{color: 'red'}}>{signUpFormErrors.confirmPassword}</FormHelperText>
                    )
                }
            </FormControl>
            <Stack>
                <Button  variant='contained' onClick={onSubmit} sx={{textTransform: "none"}} >Sign up</Button>
                <Typography alignSelf='center' sx={{marginTop: '0.5em'}}>Already have an account? 
                    <span onClick={()=>router.push(PagePath[Page.Login])} 
                    className='underline pl-2 cursor-pointer'>Log in</span></Typography>
            </Stack>

        </Box>
    )
    return(
        <AuthenticationBaseCard content={content}/>
    )
}

export default SignUpCard