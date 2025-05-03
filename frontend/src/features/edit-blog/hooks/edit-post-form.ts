import { useCreateBlockNote } from "@blocknote/react";
import { useCallback, useReducer, useState } from "react";
import { useCreatePost } from "./query";
import { Category } from "@/domains/category/types";

type PostForm = {
    title: string,
    image: File | undefined,
    category: Category[] | [],
}

type postFormValueReducerAction = 
    { type: 'title'; payload: string} 
    | {type: 'image'; payload: File | undefined}
    | {type: 'category'; payload: Category[] | []}

const postFormValueReducer = (state: PostForm, action: postFormValueReducerAction) => {
    switch(action.type){
        case 'title':
            return { ...state, title: action.payload}
        case 'image':
            return { ...state, image: action.payload}
        case 'category':{
            return { ...state, category: action.payload}
        }    
    }
}

export const usePostForm = () => {
    const {mutate: createPost} = useCreatePost();
    const [postFormErrors, setPostFormErrors] = useState<{[key in keyof PostForm]: string}>()
    const [postFormValue, dispatchPostFormValue] = useReducer(postFormValueReducer,{
            title: '',
            image: undefined,
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
        if(postFormValue.image){
            if(postFormValue.image.size > 1000000){
                errors.image = '画像ファイルは1Mサイズ以内にしてください'
                isValid = false
            }
            else if(['image/jpeg', 'image/jpg', 'image/png'].includes(postFormValue.image.type)){
                errors.image = 'サポートされないファイル形式です。jpeg,jpgまたはpngを選択してください'
                isValid = false
            }
        }
        if(postFormValue.category.length === 0){
            errors.category = '1以上のカテゴリを選択してください'
            isValid = false
        }
        
        setPostFormErrors(errors)
        return isValid
    },[postFormValue])

    const onSubmit = useCallback(async(html: string)=> {
        console.log("accessed here")
        if(!validate()){
            return
        }
        console.log("success")

        const categoryIds = postFormValue.category.map(item=>item.id)
        console.log(html)
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
        onSubmit: onSubmit
    }

}