import { Button } from "@mui/material"

type ButtonProps = {
    text: string;
    onClick: () => void;
    fullWidth?: boolean
}

export function RoundButton({text, onClick, fullWidth = false}: ButtonProps){
    return(
        <Button variant='outlined' 
            sx={{ 
                padding: '0.3em 0.6em', 
                borderRadius: '99em', 
                height: 'fit-content',
                ...(fullWidth ? {} : {width: 'fit-content'})
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
    console.log(isSubscribed)
    return(
        <Button fullWidth={fullWidth} variant={isSubscribed ? 'outlined': 'contained'} 
            sx={{ 
                padding: '0.3em 0.6em', 
                borderRadius: '99em', 
                height: 'fit-content',
                ...(fullWidth ? {} : {width: 'fit-content'})
            }}
            onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}>
        {isSubscribed? 'following': 'follow'}
        </Button> 
    )
}