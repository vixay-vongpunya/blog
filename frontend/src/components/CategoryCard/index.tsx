import { Page, PagePath } from "@/providers/PageProviders/hook";
import { Card, Typography } from "@mui/material";


function CategoryCard({index, type, onClick}:{index: number, type:string, onClick: ()=>void}){
    return(
        <Card key={index} 
        onClick={onClick}
        sx={{
            padding: '0.5em 1em',  
            boxShadow:2, 
            borderRadius: '0.5em',
            cursor: 'pointer'}}>
            <Typography>{type}</Typography>
        </Card>
    )
}

export default CategoryCard;