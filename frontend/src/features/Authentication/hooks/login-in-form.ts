import { useCallback, useReducer, useState } from "react"
import { useLogInMutation} from "./query";

export type LogInForm = {
    email: string,
    password: string,
}

export const useLogInForm = () =>{
    const { mutate: logIn } = useLogInMutation();
    const [logInFormErrors, setLogInFromErrors] = useState<{[key in keyof LogInForm]: string}>();
    const [logInFormValue, dispatchLogInFormValue] = useReducer(
        (state: LogInForm, 
        action: {
            type: 'email' | 'password',
            payload: string

        })=>{
            switch (action.type){
                case 'email':
                    return { ...state, email: action.payload};
                case 'password':
                    return { ...state, password: action.payload};
            }
        },{
            email: '',
            password: '',
        }
    );

    const validateForm = useCallback(()=>{
        let isValid = true;
        let error = {
            email: '',
            password: '',
            confirmPassword: ''
        }
        
        if(logInFormValue.email.length > 254){
            isValid = false
            error.email = "メールアドレスは254文字以内で入力してください"
        }
        else if(!/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(logInFormValue.email)){
            isValid = false
            error.email = "メールアドレスの形式で入力してください"
        }
        else if(!logInFormValue.password){
            isValid = false
            error.password = "パースワードを入力してください"
        }
        else if(logInFormValue.password.length < 8){
            isValid = false
            error.password = "パースワードを８文字以上で入力してください"
        }
        else if(!/[a-z]/.test(logInFormValue.password)){
            isValid = false
            error.password = "パースワードに小文字を含めて入力してください"
        }
        else if(!/[A-Z]/.test(logInFormValue.password)){
            isValid = false
            error.password = "パースワードに大文字を含めて入力してください"
        }
        else if(!/[0-9]/.test(logInFormValue.password)){
            isValid = false
            error.password = "パースワードに数字を含めて入力してください"
        }
        else if(!/[!@#$%^&*]/.test(logInFormValue.password)){
            isValid = false
            error.password = "パースワードに記号(!@#$%^&*など)を含めて入力してください"
        }

        setLogInFromErrors(error)
        return isValid

    },[logInFormValue.email, logInFormValue.password])

    const onSubmit= useCallback( async()=>{
        if(!validateForm()) return;
        logIn(logInFormValue)        
        
    },[validateForm])

    return {
        logInFormValue,
        logInFormErrors,
        dispatchLogInFormValue,
        onSubmit
    }

}