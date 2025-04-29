import CategorySearchPanel from "@/features/category-search/components/CategorySearchPanel"
import { DataProvider } from "@/providers/DataProvider";

type Props = {
    params: Promise<{category: string}>;
  };

const TagPage = async({params}:Props) => {
  const {category} = await params
    return(
      <DataProvider>
        <CategorySearchPanel categoryName={category}/>
      </DataProvider>
        
    )
}

export default TagPage