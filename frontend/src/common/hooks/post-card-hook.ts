import { Page, PagePath } from "@/providers/PageProviders/hook";
import { QueryParamItems, useQueryParams } from "@/providers/QueryParamsProvider";
import { useRouter } from "next/navigation";

export const usePostCard = () => {
    const router = useRouter()
    const {dispatchQueryParams} = useQueryParams()
    const onClickProfile = (event: React.MouseEvent<HTMLDivElement>, author: {id: string, name: string}) => {
        event.stopPropagation();
        dispatchQueryParams({type: QueryParamItems.ProfileId, payload: author.id})
        router.push(`${PagePath[Page.Profile]}/${author.name}`)
    }

    const onClickPost = (postId: string, postTitle: string) => {
        router.push(`${PagePath[Page.Post]}/${postTitle}-${postId}`)
    }

    const onClickCategory = (event: React.MouseEvent<HTMLButtonElement>, category: {id: string, name: string}) => {
        event.stopPropagation();
        router.push(`${PagePath[Page.Category]}/${category.name}-${category.id}`)
    }

    const onClickSave = (event: React.MouseEvent<HTMLElement>,  postId: string) => {
        event.stopPropagation();
        console.log('save')
        
    }

    return{
        onClickPost: onClickPost,
        onClickProfile: onClickProfile,
        onClickCategory: onClickCategory,
        onClickSave: onClickSave
    }
}
