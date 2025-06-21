import CategoryAuthorList from "@/features/category-search/components/CategoryAuthorList"
import { PageProvider } from "@/providers/PageProviders"
import { Page } from "@/providers/PageProviders/hook"

type AccountProps = {
    params: Promise<{slug: string}>
}

const Authors = async({params}: AccountProps) => {
    const {slug} = await params
    const categoryParams = slug.split('-')
    const category = {
        id : categoryParams[1],
        name: categoryParams[0]
    }

    return (
        <PageProvider page={Page.Category}>
            {/* <Profile userName={userName}/> */}
            <CategoryAuthorList category={category}/>
        </PageProvider>)
}

export default Authors