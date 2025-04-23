
import CategorySearchPanel from "@/features/category-search/components/CategorySearchPanel"

type Props = {
    params: {
      slug: string;
    };
  };

const TagPage = ({params}:Props) => {

    return(
        <CategorySearchPanel slug={params.slug}/>
    )
}

export default TagPage