import { queryKey } from "@/common/hooks/post-card-hook"
import PostList from "@/common/post-list/PostList"
import { Page, PagePath } from "@/providers/PageProviders/hook"
import { Pagination, Stack } from "@mui/material"
import { useRouter } from "next/navigation"
import { useSearchPostsQuery, useSearchPostsTotalPagesQuery } from "../../hooks/query"
import { PostSearch } from "@/domains/post/types"
import { useCursor } from "../../hooks/search-data"
import { useRef } from "react"

type PaginationDisplayProps = {
    query: string,
    source: string,
    order: string | null,
    page: number,
}

//still need to manage UX for when navigating page, the loading is too visible
function PaginationDisplay({query, source, order, page}: PaginationDisplayProps){
    const router = useRouter()
    const {cursor, setCursor}= useCursor()

    const pageCountData = {
        keyword: query,
        take: 12, 
        order: 'desc' as PostSearch['order']
    }
    const {data: pageCount} = useSearchPostsTotalPagesQuery(pageCountData)
    
    const data = {
        keyword: query,
        cursor: cursor.value,
        take: cursor.direction*12, 
        page: page,
        order: 'desc' as PostSearch['order']
    }

    const {data: posts, isLoading} = useSearchPostsQuery(data)
    const handlePagination = (event: React.ChangeEvent<unknown>, clickedPage: number) => {    
            const flag = clickedPage - page
            if(flag === 1){
                setCursor({value: posts?.pages[0][11].id, direction: flag})
            }
            else if(flag === -1){
                setCursor({value: posts?.pages[0][11].id, direction: flag})
            }
            else{
                setCursor({value: null, direction: 1})
            }
            router.replace(`${PagePath[Page.Search]}?q=${query}&page=${clickedPage}&source=${source}&order=${order}`)
        }
    console.log("paginate", posts, page)

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