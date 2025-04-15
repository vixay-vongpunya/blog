import { useCallback, useReducer, useState } from "react"
import { useSignUpMutation } from "./query";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/providers/SnackbarProvder";


export type SignUpFormProps = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export const useSignUpForm = () =>{
    const route = useRouter()
    const showSnackbar = useSnackbar()
    const { mutate: signUp, isError, error } = useSignUpMutation();
    const [signUpFormErrors, setSignUpFromErrors] = useState<{[key in keyof SignUpFormProps]: string}>();
    const [signUpFormValue, dispatchSignUpFormValue] = useReducer(
        (state: SignUpFormProps, 
        action: {
            type: 'name' | 'email' | 'password' | 'confirmPassword',
            payload: string

        })=>{
            switch (action.type){
                case 'name':
                    return { ...state, name: action.payload};
                case 'email':
                    return { ...state, email: action.payload};
                case 'password':
                    return { ...state, password: action.payload};
                case 'confirmPassword':
                    return { ...state, confirmPassword: action.payload};
            }
        },{
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    );

    const validateForm = useCallback(()=>{
        let isValid = true;
        let error = {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
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
            error.password = "パースワードを入力してください"
        }
        else if(signUpFormValue.password.length < 8){
            isValid = false
            error.password = "パースワードを８文字以上で入力してください"
        }
        else if(!/[a-z]/.test(signUpFormValue.password)){
            isValid = false
            error.password = "パースワードに小文字を含めて入力してください"
        }
        else if(!/[A-Z]/.test(signUpFormValue.password)){
            isValid = false
            error.password = "パースワードに大文字を含めて入力してください"
        }
        else if(!/[0-9]/.test(signUpFormValue.password)){
            isValid = false
            error.password = "パースワードに数字を含めて入力してください"
        }
        else if(!/[!@#$%^&*]/.test(signUpFormValue.password)){
            isValid = false
            error.password = "パースワードに記号(!@#$%^&*など)を含めて入力してください"
        }
        // else if(signUpFormValue.password !== signUpFormValue.confirmPassword){
        //     isValid = false
        //     error.confirmPassword = "パースワードは一致していません"
        // }

        setSignUpFromErrors(error)
        return isValid

    },[signUpFormValue.name,signUpFormValue.email, signUpFormValue.password])

    const onSubmit= useCallback( async()=>{
        if(!validateForm()) return;
        signUp(signUpFormValue)        
        
    },[validateForm])

    return {
        signUpFormValue,
        signUpFormErrors,
        dispatchSignUpFormValue,
        onSubmit
    }

}