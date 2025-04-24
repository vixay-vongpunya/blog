'use client'
import { Category } from "@/api/category";
import { useGetCategoryQuery } from "@/utils/globalQuery";
import { createContext, ReactNode, useContext } from "react";

type DataContext = {
    categories: Category[] | [],
}

const DataContext = createContext<DataContext>({
    categories: [],
})

export const DataProvider = ({children}:{children: ReactNode})=>{
    const {data: categories, isLoading} = useGetCategoryQuery() 
    if(isLoading){
        return<>loading</>
    }
    return (
    <DataContext.Provider value={{categories: categories}}>
        {children}
    </DataContext.Provider>)
}

export const useData = () => useContext(DataContext)