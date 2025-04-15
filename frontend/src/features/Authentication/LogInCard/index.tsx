"use client";
import { Box, Button, Card, CardContent, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Stack, TextField, Typography } from '@mui/material';
import { useLogInForm } from '../hooks/login-in-form';

function LogInCard(){
    const {logInFormValue, logInFormErrors, dispatchLogInFormValue, onSubmit} = useLogInForm()
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
                <Typography component='h1' fontWeight='bold' variant='h4' color='primary' sx={{width:'100%'}}>Log in</Typography>
                <Box  sx={{display: 'flex', flexDirection: 'column', gap:2}}>
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
                    <Button  variant='contained' onClick={onSubmit}>Log in</Button>
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

export default LogInCard;