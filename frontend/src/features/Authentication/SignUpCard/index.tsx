"use client";
import { Box, Button, Card, CardContent, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Stack, TextField, Typography } from '@mui/material';
import { useSignUpForm } from '../hooks/sign-up-form';

function SignUpCard(){
    const {signUpFormValue, signUpFormErrors, dispatchSignUpFormValue, onSubmit} = useSignUpForm()
    return(
        <Stack sx={{
            direction: 'column', 
            justifyContent: 'space-between',
            height: '100vh',
            bgcolor: 'grey'
            }}>
            <Card variant='outlined' sx={{
                alignSelf: 'center',
                margin: 'auto',
                padding: 2,
                width: '450px'}}>
                <Typography component='h1' fontWeight='bold' variant='h4' color='primary' sx={{width:'100%'}}>Sign Up</Typography>
                <Box  sx={{display: 'flex', flexDirection: 'column', gap:2}}>
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
                    <Button  variant='contained' onClick={onSubmit}>Sign Up</Button>
                </Box>
                <Box>
                    <Divider >
                        <Typography>or</Typography>
                    </Divider>
                    </Box>            
                <Typography component='h1' variant='h4'>Sign Up</Typography>
            </Card>
        </Stack>
        
    )
}

export default SignUpCard;