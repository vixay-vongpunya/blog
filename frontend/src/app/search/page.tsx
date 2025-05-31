import SearchPanel from "@/features/search/components/SearchPanel"
import { PageProvider } from "@/providers/PageProviders"
import { Page } from "@/providers/PageProviders/hook"

const Search = () => {
    return(
    <PageProvider page={Page.Search}>
        <SearchPanel/>
    </PageProvider>
    )
}

export default Search