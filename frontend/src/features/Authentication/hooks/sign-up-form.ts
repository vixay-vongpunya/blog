import { useCallback, useReducer, useState } from "react"
import { useSignUpQuery } from "./query";

export type SignUpFormValues = {
    name: string,
    email: string,
    password: string,
}

export const useSignUpForm = () =>{
    const [signUpFormErrors, setSignUpFromErrors] = useState<{[key in keyof SignUpFormValues]: string}>();
    const [signUpFormValue, dispatchSignUpFormValue] = useReducer(
        (state: SignUpFormValues, 
        action: {
            type: 'name' | 'email' | 'password',
            payload: string

        })=>{
            switch (action.type){
                case 'name':
                    return { ...state, name: action.payload};
                case 'email':
                    return { ...state, name: action.payload};
                case 'password':
                    return { ...state, name: action.payload};
            }
        },{
            name: '',
            email: '',
            password: ''
        }
    );

    const validateForm = useCallback(()=>{
        let isValid = true;
        let error = {
            name: '',
            email: '',
            password: ''
        }
        if(!signUpFormValue.name){
            isValid = false
            error.name = "氏名を入力してください"
        }
        else if(signUpFormValue.email.length > 254){
            isValid = false
            error.email = "メールアドレスは254文字以内で入力してください"
        }
        else if(!/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(signUpFormValue.email)){
            isValid = false
            error.email = "メールアドレスの形式で入力してください"
        }
        else if(!signUpFormValue.password){
            isValid = false
            error.email = "パースワードを入力してください"
        }

        setSignUpFromErrors(error)
        return isValid

    },[signUpFormValue.name,signUpFormValue.email, signUpFormValue.password])

    const onSubmit= useCallback(()=>{
        if(!validateForm()) return;
        useSignUpQuery(signUpFormValue)
                 
    },[validateForm])

    return {
        signUpFormValue,
        signUpFormErrors,
        dispatchSignUpFormValue,
        onSubmit
    }

}