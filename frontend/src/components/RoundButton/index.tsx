import { Button } from "@mui/material"

type RoundButtonProps = {
    text: string
    onClick: () => void
}

function RoundButton({text, onClick}: RoundButtonProps){

    return(
        <Button variant='outlined' 
            sx={{ 
                padding: '0.3em 0.6em', 
                marginTop: 2,
                borderRadius: '99em', 
                width: 'fit-content'}}
            onClick={onClick}>
        {text}
        </Button> 
    )
}

export default RoundButton