import { queryKey } from "@/common/hooks/post-card-hook"
import PostList from "@/common/post-list/PostList"
import { Page, PagePath } from "@/providers/PageProviders/hook"
import { Pagination, Stack } from "@mui/material"
import { useRouter } from "next/navigation"
import { useSearchPostsQuery, useSearchPostsTotalPagesQuery } from "../../hooks/query"

type PaginationDisplayProps = {
    query: string,
    source: string,
    page: number,
}

//still need to manage UX for when navigating page, the loading is too visible
function PaginationDisplay({query, source, page}: PaginationDisplayProps){
    const router = useRouter()

    const pageCountData = {
        query: query,
        take: 12, 
    }
    const {data: pageCount} = useSearchPostsTotalPagesQuery(pageCountData)
    
    const data = {
        query: query,
        page: page,
    }

    const {data: posts, isLoading} = useSearchPostsQuery(data)
    const handlePagination = (event: React.ChangeEvent<unknown>, clickedPage: number) => {    
            router.replace(`${PagePath[Page.Search]}?q=${query}&display=pagination&page=${clickedPage}&source=${source}`)
        }

    return(
        <Stack marginBottom='4em'>
            <PostList posts={posts?.pages[0]} queryKey={queryKey.searchPosts(query, page)}/>
            <Pagination 
                hideNextButton 
                hidePrevButton 
                page={page}
                count={pageCount}
                sx={{ marginTop: '4em', alignSelf: 'center'}} onChange={handlePagination}/>
        </Stack>
    )
}

export default PaginationDisplay