import { Category } from "@/domains/category/types";
import { Box } from "@mui/material";
import CategoryCard from "../CategoryCard";
import { useRouter } from "next/navigation";
import { Page, PagePath } from "@/providers/PageProviders/hook";

type CategoryListProps = {
    categories: Category[] | undefined
}

function CategoryList({categories}: CategoryListProps){
    const router = useRouter()
    return(
        <Box sx={{display: "flex", gap:1, marginLeft: '1em'}}>
                {categories?.slice(0,5).map((item)=>(
            <CategoryCard  
                key={item.id} 
                name={item.name}
                onClick={()=>router.push(`${PagePath[Page.Category]}/${item.name}-${item.id}`)}/>
        ))}
        </Box>
    )
}

export default CategoryList;