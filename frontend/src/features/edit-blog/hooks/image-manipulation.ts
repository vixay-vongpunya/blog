import { Category } from "@/domains/category/types"
import { usePostForm } from "./edit-post-form"
import { useMemo, useRef } from "react"

export function useImageInput(){
    const { postFormValue ,dispatchPostFormValue} = usePostForm()
    const inputFileRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (event: any) => {
        const file = event.target.files?.[0]
        dispatchPostFormValue({type:'image', payload: file})
    }

    const previewImage = useMemo(()=>{
        if(postFormValue.image){
            return URL.createObjectURL(postFormValue.image)
        }
        return null
    },[postFormValue.image])
    return{
        inputFileRef: inputFileRef,
        previewImage: previewImage,
        handleFileChange: handleFileChange,
    }
}
