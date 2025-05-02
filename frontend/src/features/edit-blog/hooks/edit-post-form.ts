import { useCreateBlockNote } from "@blocknote/react";
import { useCallback, useReducer, useState } from "react";
import { useCreatePost } from "./query";
import { Category } from "@/domains/category/types";
import { useGetCategoryQuery } from "@/utils/globalQuery";

type PostForm = {
    title: string,
    image: File | null,
    category: Category[] | [],
}

type postFormValueReducerAction = 
    { type: 'title'; payload: string} 
    | {type: 'image'; payload: File | null}
    | {type: 'category'; payload: Category[] | []}

const postFormValueReducer = (state: PostForm, action: postFormValueReducerAction) => {
    switch(action.type){
        case 'title':
            return { ...state, title: action.payload}
        case 'image':
            return { ...state, image: action.payload}
        case 'category':
            return { ...state, category: action.payload}
    }
}

export const usePostForm = () => {
    const {mutate: createPost} = useCreatePost();
    const {data: allCategory} = useGetCategoryQuery()
    const [categories, setCategories] = useState<Category[]>()
    const [postFormErrors, setPostFormErrors] = useState<{[key in keyof PostForm]: string}>()



    const editor = useCreateBlockNote({
        initialContent:[
            {
                type: "paragraph",
                content: "If you want to add this custom style to your component, you can use the style or GlobalStyles component from MUI, or add it directly in a <style> tag within the component. Here's how you can do it:"
            }
        ]
    })

    const [postFormValue, dispatchPostFormValue] = useReducer(postFormValueReducer,{
            title: '',
            image: null,
            category: []
        }
    )

    const validate = useCallback(() =>{
        let isValid = true
        let errors = {
            title: '',
            image: '',
            category: ''
        }

        if(!postFormValue.title){
            errors.title = 'タイトルをご入力ください'
            isValid = false
        }
        else if(postFormValue.image){
            if(postFormValue.image.size > 1000000){
                errors.image = '画像ファイルは1Mサイズ以内にしてください'
                isValid = false
            }
            else if(['image/jpeg', 'image/jpg', 'image/png'].includes(postFormValue.image.type)){
                errors.image = 'サポートされないファイル形式です。jpeg,jpgまたはpngを選択してください'
                isValid = false
            }
        }
        else if(!postFormValue.category){
            errors.category = '1以上のカテゴリを選択してください'
            isValid = false
        }
        setPostFormErrors(errors)
        return isValid
    },[postFormValue])

    const onSubmit = useCallback(async()=> {

        if(!validate()){
            return
        }

        const html = await editor.blocksToHTMLLossy(editor.document)
        const categoryIds = postFormValue.category.map(item=>item.id)

        let formData = new FormData()
        formData.append('title', postFormValue.title)
        if(postFormValue.image){
            formData.append('image', postFormValue.image)
        }
        formData.append('content', html)
        formData.append('categoryIds', JSON.stringify(categoryIds))

        createPost(formData)
    },[postFormValue])

    return {
        postFormValue: postFormValue,
        postFormErrors: postFormErrors,
        dispatchPostFormValue: dispatchPostFormValue,
        editor: editor,
        onSubmit: onSubmit
    }

}