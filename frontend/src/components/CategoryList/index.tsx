import { Category } from "@/domains/category/types";
import { Box, Button, Typography } from "@mui/material";
import CategoryCard from "../CategoryCard";
import { useRouter } from "next/navigation";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import { useMatchMedia } from "@/utils/useMatchMedia";

type CategoryListProps = {
    categories: Category[],
    size: 'small' | 'big'
}

function CategoryList({categories, size}: CategoryListProps){
    const router = useRouter()
    const matchMedia = useMatchMedia()
    let isMobile = matchMedia === "mobile"
    return(
        <Box sx={{display: "flex", gap:1}}>
            {categories?.slice(0, 3).map((category: Category)=>(
                <Button 
                    key={category.id}
                    variant='outlined' 
                    sx={{ minWidth: 'fit-content', padding: size=== 'small' ? '0.2em 0.5em' : '0.5em 1em', borderRadius: 2}}
                    onClick={(event) => router.push(`${PagePath[Page.Category]}/${category.name}-${category.id}`)}>
                        <Typography variant="body2">
                            {category.name}
                        </Typography>
                </Button>
            ))}
            
            {categories?.length > 3 && (
                <Button variant='outlined' 
                    sx={{ minWidth: 'fit-content',padding: '0.2em 0.4em',borderRadius: 2}}>
                    <Typography variant="body2">
                    +{categories.length - 2}
                    </Typography>
                </Button>
            )}
        </Box>
    )
}

export default CategoryList;