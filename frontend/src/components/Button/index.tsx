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
    fullWidth?: boolean,
    isSubscribed: boolean;
    handleSubscribe: ()=>void;
    handleUnsubscribe: () => void;

}

export function SubscribeButton({fullWidth=false, isSubscribed, handleSubscribe, handleUnsubscribe}: SubscribeButtonProps){
    return(
        <Button fullWidth={fullWidth} variant={isSubscribed ? 'outlined': 'contained'} 
            sx={{ 
                padding: '0.3em 0.6em', 
                borderRadius: '99em', 
                ...(fullWidth ? {} : {width: 'fit-content'})
            }}
            onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}>
        {isSubscribed? 'following': 'follow'}
        </Button> 
    )
}