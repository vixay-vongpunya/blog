
import CategorySearchPanel from "@/features/category-search/components/CategorySearchPanel"

const TagPage = ({params}:{params: {slug: string}}) => {
    return(
        <CategorySearchPanel params={params}/>
    )
}

export default TagPage