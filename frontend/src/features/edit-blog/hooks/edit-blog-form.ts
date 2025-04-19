import { category, Category } from "@/data/blogs";
import { useCreateBlockNote } from "@blocknote/react";
import { useReducer, useState } from "react";
import { useCreatePost } from "./query";

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

    const validate = () =>{
        let isValid = true
        let errors = {
            title: '',
            image: '',
            category: ''
        }

        if(blogFormValue.title){
            errors.title = 'タイトルをご入力ください'
            isValid = false
        }
        else if(blogFormValue.image){
            if(blogFormValue.image.size > 1000000){
                errors.image = '画像ファイルは1Mサイズ以内にしてください'
            }
            else if(['image/jpeg', 'image/jpg', 'image/png'].includes(blogFormValue.image.type)){
                errors.image = 'サポートされないファイル形式です。jpeg,jpgまたはpngを選択してください'
            }
        }
        else if(!blogFormValue.category){
            errors.category = '1以上のカテゴリを選択してください'
        }

        setBlogFormErrors(errors)
        return isValid
    }

    const onSubmit = () => {
        if(!validate){
            return
        }
        console.log(editor.document)

        let formData = new FormData()
        formData.append('title', blogFormValue.title)
        if(blogFormValue.image){
            formData.append('image', blogFormValue.image)
        }
        formData.append('category', JSON.stringify(category))
        formData.append('content', JSON.stringify(editor.document))
        createPost(formData)
    }
    return {
        blogFormValue: blogFormValue,
        blogFormErrors: blogFormErrors,
        dispatchBlogFormValue: dispatchBlogFormValue,
        editor,
        onSubmit: onSubmit
    }

}