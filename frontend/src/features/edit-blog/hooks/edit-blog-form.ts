import { useCreateBlockNote } from "@blocknote/react";
import { useCallback, useReducer, useState } from "react";
import { useCreatePost } from "./query";
import { Category } from "@/api/category";

type BlogForm = {
    title: string,
    image: File | null,
    category: Category[] | [],
}

type blogFormValueReducerAction = 
    { type: 'title'; payload: string} 
    | {type: 'image'; payload: File | null}
    | {type: 'category'; payload: Category[] | []}

const blogFormValueReducer = (state: BlogForm, action: blogFormValueReducerAction) => {
    switch(action.type){
        case 'title':
            return { ...state, title: action.payload}
        case 'image':
            return { ...state, image: action.payload}
        case 'category':
            return { ...state, category: action.payload}
    }
}

export const useBlogForm = () => {
    const {mutate: createPost} = useCreatePost();
    const [blogFormErrors, setBlogFormErrors] = useState<{[key in keyof BlogForm]: string}>()
    const editor = useCreateBlockNote({
    initialContent:[
        {
        type: "paragraph",
        content: "If you want to add this custom style to your component, you can use the style or GlobalStyles component from MUI, or add it directly in a <style> tag within the component. Here's how you can do it:"
        }
    ]
    })

    const [blogFormValue, dispatchBlogFormValue] = useReducer(blogFormValueReducer,{
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

        if(!blogFormValue.title){
            errors.title = 'タイトルをご入力ください'
            isValid = false
        }
        else if(blogFormValue.image){
            if(blogFormValue.image.size > 1000000){
                errors.image = '画像ファイルは1Mサイズ以内にしてください'
                isValid = false
            }
            else if(['image/jpeg', 'image/jpg', 'image/png'].includes(blogFormValue.image.type)){
                errors.image = 'サポートされないファイル形式です。jpeg,jpgまたはpngを選択してください'
                isValid = false
            }
        }
        else if(!blogFormValue.category){
            errors.category = '1以上のカテゴリを選択してください'
            isValid = false
        }
        setBlogFormErrors(errors)
        return isValid
    },[blogFormValue])

    const onSubmit = useCallback(async()=> {

        if(!validate()){
            return
        }

        let formData = new FormData()
        formData.append('title', blogFormValue.title)
        if(blogFormValue.image){
            formData.append('image', blogFormValue.image)
        }
        const html = await editor.blocksToHTMLLossy(editor.document)
        const categoryIds = blogFormValue.category.map(item=>item.id)
        console.log("ids",categoryIds)
        formData.append('content', html)
        formData.append('categoryIds', JSON.stringify(categoryIds))

        createPost(formData)
    },[blogFormValue])
    return {
        blogFormValue: blogFormValue,
        blogFormErrors: blogFormErrors,
        dispatchBlogFormValue: dispatchBlogFormValue,
        editor: editor,
        onSubmit: onSubmit
    }

}