import { usePostForm } from "./edit-post-form"
import { useMemo, useRef } from "react"

export function useImageInput(image:any){
    const inputFileRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (event: any) => {

    }

    const previewImage = useMemo(()=>{
        if(image){
            return URL.createObjectURL(image)
        }
        return null
    },[image])
    return{
        inputFileRef: inputFileRef,
        previewImage: previewImage,
        handleFileChange: handleFileChange,
    }
}
