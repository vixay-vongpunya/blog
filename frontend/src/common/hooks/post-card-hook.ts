import { Page, PagePath } from "@/providers/PageProviders/hook";
import { useCreateSavePostMutation, useDeleteSavePostMutation } from "@/utils/hooks/post";
import { useRouter } from "next/navigation";

// after save i need to setQueryData but the postlist can be from below querykey
export const queryKey = {
    allPost: ['all-posts'],
    postsByCategory: (categoryId: string) => ['posts-by-category', categoryId]
} as const

export const usePostCard = () => {
    const router = useRouter()
    const {mutate: postSave} = useCreateSavePostMutation()
    const {mutate: postDelete} = useDeleteSavePostMutation()

    const onClickProfile = (event: React.MouseEvent<HTMLSpanElement>, author: {id: string, name: string}) => {
        event.stopPropagation();
        router.push(`${PagePath[Page.Profile]}/${author.name}`)
    }

    const onClickPost = (postId: string, postTitle: string) => {
        router.push(`${PagePath[Page.Post]}/${postTitle}-${postId}`)
    }

    const onClickCategory = (event: React.MouseEvent<HTMLButtonElement>, category: {id: string, name: string}) => {
        event.stopPropagation();
        router.push(`${PagePath[Page.Category]}/${category.name}-${category.id}`)
    }

    const onClickSave = (event: React.MouseEvent<HTMLElement>,  postId: string, savedPost: {id: string} | null, queryKey: readonly unknown[]) => {
        event.stopPropagation();
        console.log(queryKey)
        if(savedPost){
            postDelete({id: savedPost.id, queryKey: queryKey})
        }
        else{
            postSave({postId: postId, queryKey: queryKey})
        }    
    }

    return{
        onClickPost: onClickPost,
        onClickProfile: onClickProfile,
        onClickCategory: onClickCategory,
        onClickSave: onClickSave
    }
}
