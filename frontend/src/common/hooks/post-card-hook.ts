import { Page, PagePath } from "@/providers/PageProviders/hook";
import { useCreateSavePostMutation, useDeleteSavePostMutation } from "@/utils/hooks/post";
import { useRouter } from "next/navigation";

export const usePostCard = () => {
    const router = useRouter()
    const {mutate: postSave} = useCreateSavePostMutation()
    const {mutate: postDelete} = useDeleteSavePostMutation()
    const onClickProfile = (event: React.MouseEvent<HTMLDivElement>, author: {id: string, name: string}) => {
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

    const onClickSave = (event: React.MouseEvent<HTMLElement>,  postId: string, savedPost: {id: string} | null) => {
        event.stopPropagation();
        if(savedPost){
            postDelete(savedPost.id)
        }
        else{
            postSave(postId)
        }    
    }

    return{
        onClickPost: onClickPost,
        onClickProfile: onClickProfile,
        onClickCategory: onClickCategory,
        onClickSave: onClickSave
    }
}
