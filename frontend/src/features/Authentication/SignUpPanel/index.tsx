"use client";
import { Box, Button, Card, CardContent, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Stack, TextField, Typography } from '@mui/material';
import { useSignUpForm } from '../hooks/sign-up-form';
import SignUpCard from './SignUpCard';
import Content from './Content';

function SignUpPanel(){

    return(
        <Stack sx={{
            flexDirection: 'row', 
            height: '100vh',
            }}>
            <Content/>
            <SignUpCard/>
        </Stack>
        
    )
}

export default SignUpPanel;