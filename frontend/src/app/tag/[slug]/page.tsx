'use client'
import CategorySearchPanel from "@/features/category-search/components/CategorySearchPanel"

const TagPage = ({params}:{params: {slug: string}}) => {
    return(
        <CategorySearchPanel slug={params.slug}/>
    )
}

export default TagPage