// import { useEffect, useState } from "react";


// export const useLocalStorage = <T>(key:string, defaultValue: T): [T, (value: T) => void] => {
//     // once component mounts read the localStorage, lazy loading
//     const [value, setValue] = useState<T>(() => {
//         try{
//             //convert json string to js object 
//             const jsonValue = window.localStorage.getItem(key);
//             return jsonValue !== null ? JSON.parse(jsonValue) : defaultValue;
//         }
//         catch(error){
//             return defaultValue
//         }
//     });

//     useEffect(()=>{
//         const rawValue = JSON.stringify(value);
//         localStorage.setItem(key, rawValue);
//     },[value, setValue]);

//     return [value, setValue]
// };