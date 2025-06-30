import { Button } from "@mui/material";

type MoreButtonProps = {
    onClick: () => void
}

function MoreButton({onClick}: MoreButtonProps){
    return(
        <Button variant='text' sx={{color: 'text.secondary', marginTop: '1em'}} onClick={onClick}>See all</Button>
    )
}

export default MoreButton;