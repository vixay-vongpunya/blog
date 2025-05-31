import InfiniteScrollDisplay from "@/features/search/components/InfiniteScrollDisplay";
import { Page, PagePath } from "@/providers/PageProviders/hook";
import { useCreateSavePostMutation, useDeleteSavePostMutation } from "@/utils/hooks/post/query";
import { useRouter } from "next/navigation";

// after save i need to setQueryData but the postlist can be from below querykey
export const queryKey = {
    allPosts: ['all-posts'],
    postsByCategory: (categoryId: string) => ['posts-by-category', categoryId],
    userPosts: ['user-posts'],
    searchPosts: (keyWord: string, page: number) => ['search', keyWord, page],
    InfiniteScrollPosts: ['infinite-posts']
} as const

export const usePostCard = () => {
    const router = useRouter()
    const {mutate: postSave} = useCreateSavePostMutation()
    const {mutate: postDelete} = useDeleteSavePostMutation()

    const onClickProfile = (event: React.MouseEvent<HTMLSpanElement>, author: {id: string, name: string}) => {
        event.stopPropagation();
        router.push(`${PagePath[Page.Profile]}/${author.name}-${author.id}`)
    }

    const onClickPost = (postId: string, postTitle: string) => {
        router.push(`${PagePath[Page.Post]}/${postTitle}-${postId}`)
    }

    const onClickCategory = (event: React.MouseEvent<HTMLButtonElement>, category: {id: string, name: string}) => {
        event.stopPropagation();
        router.push(`${PagePath[Page.Category]}/${category.name}-${category.id}`)
    }

    const onClickSave = (event: React.MouseEvent<HTMLElement>, pageNumber: number,  postId: string, savedPost: {id: string} | null, queryKey: readonly unknown[]) => {
        event.stopPropagation();
        console.log(queryKey)
        if(savedPost){
            postDelete({id: savedPost.id, pageNumber, queryKey: queryKey})
        }
        else{
            postSave({postId: postId, pageNumber, queryKey: queryKey})
        }    
    }

    return{
        onClickPost: onClickPost,
        onClickProfile: onClickProfile,
        onClickCategory: onClickCategory,
        onClickSave: onClickSave
    }
}
