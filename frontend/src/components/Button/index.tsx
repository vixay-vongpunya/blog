import { Button } from "@mui/material"

type ButtonProps = {
    text: string;
    onClick: () => void
}

export function RoundButton({text, onClick}: ButtonProps){
    return(
        <Button variant='outlined' 
            sx={{ 
                padding: '0.3em 0.6em', 
                borderRadius: '99em', 
                width: 'fit-content',
            }}
            onClick={onClick}>
        {text}
        </Button> 
    )
}

type SubscribeButtonProps = {
    isSubscribed: boolean;
    handleSubscribe: ()=>void;
    handleUnsubscribe: () => void;

}
export function SubscribeButton({isSubscribed, handleSubscribe, handleUnsubscribe}: SubscribeButtonProps){
    return(
        <Button variant={isSubscribed ? 'outlined': 'contained'} 
            sx={{ 
                padding: '0.3em 0.6em', 
                borderRadius: '99em', 
                width: 'fit-content',
            }}
            onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}>
        {isSubscribed? 'following': 'follow'}
        </Button> 
    )
}