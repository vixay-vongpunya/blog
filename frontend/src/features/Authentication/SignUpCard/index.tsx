import { Box, Button, Card, CardContent, Divider, FormControl, FormControlLabel, FormLabel, Stack, TextField, Typography } from "@mui/material";

function SignUpCard(){
    return(
        <Stack sx={{
            direction: "column", 
            justifyContent: "space-between",
            height: "100vh",
            bgcolor: "grey"
            }}>
            <Card variant="outlined" sx={{
                alignSelf: "center",
                margin: "auto",
                padding: 2,
                width: "450px"}}>
                <Typography component="h1" fontWeight="bold" variant="h4" color="primary" sx={{width:'100%'}}>Sign Up</Typography>
                <Box component="form" sx={{display: "flex", flexDirection: "column", gap:2}}>
                    <FormControl>
                        <FormLabel htmlFor="name">name</FormLabel>
                        <TextField 
                            id = "name"
                            placeholder = "Enter your name"
                            autoComplete="name"
                            fullWidth
                            size="small"                         
                            />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField 
                            id = "email"
                            placeholder = "@email.com"
                            autoComplete="email"
                            fullWidth
                            size="small"
                            />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField 
                            id = "password"
                            type = "password"
                            placeholder = "••••••"
                            fullWidth
                            size="small"
                            />
                    </FormControl>
                    <Button type="submit" variant="contained" >Sign Up</Button>
                </Box>
                <Box>
                    <Divider >
                        <Typography>or</Typography>
                    </Divider>
                    </Box>            
                <Typography component="h1" variant="h4">Sign Up</Typography>
            </Card>
        </Stack>
        
    )
}

export default SignUpCard;