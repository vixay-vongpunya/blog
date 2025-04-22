import { Page, PagePath } from "@/providers/PageProviders/hook";
import { Card, Typography } from "@mui/material";

type CategorCardProps = {
    key: string,
    name: string,
    onClick: ()=>void
}

function CategoryCard({key, name, onClick}:CategorCardProps){
    return(
        <Card key={key} 
        onClick={onClick}
        sx={{
            padding: '0.5em 1em',  
            boxShadow:2, 
            borderRadius: '0.5em',
            cursor: 'pointer'}}>
            <Typography>{name}</Typography>
        </Card>
    )
}

export default CategoryCard;