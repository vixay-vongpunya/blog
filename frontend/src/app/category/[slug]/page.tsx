import CategorySearchPanel from "@/features/category-search/components/CategorySearchPanel"

type Props = {
  params: Promise<{slug: string}>;
};

const Category = async({params}:Props) => {
  const {slug} = await params
  console.log
  const categoryParams = slug.split('-')  
  const category = {
    id : categoryParams[1],
    name: categoryParams[0]
  }

  return(
    <CategorySearchPanel category={category}/>        
  )
}

export default Category