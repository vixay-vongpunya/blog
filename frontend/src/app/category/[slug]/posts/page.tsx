import CategoryPostList from "@/features/category-search/components/CategoryPostList";

type Props = {
  params: Promise<{slug: string}>;
};

const Posts = async({params}:Props) => {
  const {slug} = await params
  console.log
  const categoryParams = slug.split('-')
  const category = {
    id : categoryParams[1],
    name: categoryParams[0]
  }

  return(
    <CategoryPostList category={category}/>     
  )
}

export default Posts