import { Page, PagePath } from "@/providers/PageProviders/hook";
import { Card, Typography } from "@mui/material";

type CategorCardProps = {
    name: string,
    onClick: ()=>void
}

function CategoryCard({ name, onClick}:CategorCardProps){
    return(
        <Card 
            onClick={onClick}
            sx={{
            padding: '0.5em 1em',  
            boxShadow:'none', 
            borderRadius: '5em',
            backgroundColor: 'background.primary',
            cursor: 'pointer'}}>
            <Typography>{name}</Typography>
        </Card>
    )
}

export default CategoryCard;