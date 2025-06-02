import ProfileImage from "@/components/ProfileImage";
import { useCallback, useReducer, useState } from "react"
import { useAccountUpdateMutation } from "./query";

type EditProfileForm = {
    name: string,
    bio: string | undefined,
    profileImage: File | undefined,
}

type ReducerAction = 
    {   type: 'name' | 'bio';
        payload: string} 
    | {
        type : 'profileImage';
        payload: File | undefined
    } | {
        type: 'initialize';
        payload: EditProfileForm
    }



const reducer = (state: EditProfileForm, 
    action : ReducerAction) => {
        switch(action.type){
            case 'name': 
                return {...state, name: action.payload}
            case 'bio':
                return {...state, bio: action.payload}
            case 'profileImage' :
                return {...state, profileImage: action.payload}
            case 'initialize': 
                return action.payload
        }
    }

export const useEditProfileForm = () => {
    const {mutate: accountUpdateMutation} = useAccountUpdateMutation()
    const [editProfileForm, dispatchEditProfileForm] = useReducer(reducer, {
        name: '',
        bio: '',
        profileImage: undefined
    })
    const [editProfileErrors, setEditProfileErrors] = useState<{[key in keyof EditProfileForm]: string}>()

    const validate = useCallback(()=>{
        let isValid = true
        let errors = {
            profileImage: '',
            name : '',
            bio: '',
        }
        if(editProfileForm.profileImage){
            if(editProfileForm.profileImage.size > 1000000){
                errors.profileImage = '画像ファイルは1Mサイズ以内にしてください'
                isValid = false
            }
            else if(!['image/jpeg', 'image/jpg', 'image/png'].includes(editProfileForm.profileImage.type)){
                errors.profileImage = 'サポートされないファイル形式です。jpeg,jpgまたはpngを選択してください'
                isValid = false
            }
        }

        if(editProfileForm.name && editProfileForm.name.length > 30){
            errors.name = '氏名を30文字以内でご記入ください'
            isValid = false
        }

        if(editProfileForm.bio && editProfileForm.bio.length > 50){
            errors.name = 'bioを30文字以内でご記入ください'
            isValid = false
        }

        setEditProfileErrors(errors)
        return isValid
    },[])

    const onSubmit = () => {
        if(!validate()){
            return false
        }

        const formData = new FormData()
        formData.append('name', editProfileForm.name)

        if(editProfileForm.bio) {
            formData.append('bio', editProfileForm.bio)
        }
        if(editProfileForm.profileImage){
            formData.append('profileImage', editProfileForm.profileImage)
        }
        accountUpdateMutation(formData)
        return true
    }

    return {
        editProfileForm: editProfileForm,
        dispatchEditProfileForm: dispatchEditProfileForm,
        editProfileErrors: editProfileErrors,
        onSubmit: onSubmit
    }
}