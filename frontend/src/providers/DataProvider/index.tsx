'use client'
import { Category } from "@/domains/category/types";
import { useGetCategoryQuery, useGetSelfSubscription } from "@/utils/globalQuery";
import { createContext, ReactNode, useContext } from "react";

type DataContext = {
    categories: Category[] | [],
}

const DataContext = createContext<DataContext>({
    categories: [],
})

export const DataProvider = ({children}:{children: ReactNode})=>{
    const {data: categories, isLoading} = useGetCategoryQuery() 
    const {data: subscription} = useGetSelfSubscription()
    if(!categories || !subscription){
        return<>loading</>
    }
    console.log(subscription)
    return (
    <DataContext.Provider value={{categories: categories}}>
        {children}
    </DataContext.Provider>)
}

export const useData = () => useContext(DataContext)