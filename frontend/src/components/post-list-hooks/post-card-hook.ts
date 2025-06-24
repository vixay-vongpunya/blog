import { Page, PagePath } from "@/providers/PageProviders/hook";
import { useCreateSavePostMutation, useDeleteSavePostMutation } from "@/utils/hooks/post/query";
import { usePostStore } from "@/utils/hooks/post/store";
import { useRouter } from "next/navigation";

// after save i need to setQueryData but the postlist can be from below querykey
export const queryKey = {
    feedPosts: ['feed-posts'],
    followingPosts: ['feed-following-posts'],
    postsByCategory: (categoryId: string) => ['posts-by-category', categoryId],
    userPosts: ['user-posts'],
    searchPosts: (keyWord: string, page: number) => ['search', keyWord, page],
    InfiniteScrollPosts: ['infinite-posts'],
    relatedPosts: (postId: string) => ['related-posts', postId]
} as const

export const usePostCard = () => {
    const router = useRouter()
    const {setSelectedPost} = usePostStore()
    const {mutate: postSave} = useCreateSavePostMutation()
    const {mutate: postDelete} = useDeleteSavePostMutation()

    const onClickProfile = (event: React.MouseEvent<HTMLSpanElement>, author: {id: string, name: string}) => {
        event.stopPropagation();
        router.push(`${PagePath[Page.Profile]}/${author.name}?source=posts`)
    }

    const onClickPost = (queryKey: readonly unknown[], pageNumber: number, postId: string, postTitle: string) => {
        setSelectedPost({queryKey: queryKey, pageNumber: pageNumber})
        router.push(`${PagePath[Page.Post]}/${postId}`)
    }

    const onClickCategory = (event: React.MouseEvent<HTMLButtonElement>, category: {id: string, name: string}) => {
        event.stopPropagation();
        router.push(`${PagePath[Page.Category]}/${category.name}-${category.id}`)
    }

    const onClickSave = (event: React.MouseEvent<HTMLElement>, pageNumber: number,  postId: string, savedPosts: {id: string} | undefined, queryKey: readonly unknown[]) => {
        event.stopPropagation();
        console.log(queryKey, savedPosts)
        if(savedPosts){
            postDelete({id: savedPosts.id, pageNumber, queryKey: queryKey})
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
