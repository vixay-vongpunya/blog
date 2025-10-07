import { Box, Button, Card, CardContent, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Stack, TextField, Typography } from '@mui/material';
import Description from '../Description';


type AuthenticationBaseCardProps = {
    content: React.ReactNode
}

function AuthenticationBaseCard({content}:AuthenticationBaseCardProps){
    return(
        <Stack direction='row' sx={{
            height:'100vh'
        }}>
            <Description/>
            <Card variant='outlined' sx={{
                alignSelf: 'center',
                margin: 'auto',
                padding: 4,
                minWidth: '450px',
                display: 'flex',
                flexDirection: 'column',
                gap: 2}}>
                {content}
                <Divider >
                    <Typography>or</Typography>
                </Divider>
                <Button variant='outlined'>Sign in with Google</Button>
                <Button variant='outlined'>Sign in with Github</Button>
            </Card>
        </Stack>
        
    )
}

export default AuthenticationBaseCard