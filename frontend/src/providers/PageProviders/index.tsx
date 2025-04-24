'use client'
import { getDefaultStore, useSetAtom } from "jotai"
import { Page, currentPageAtom } from "./hook"
import { ReactNode, useEffect } from "react";

type PageProviderProps = {
    page: Page,
    children: ReactNode,
}

export const PageProvider = ({page, children}: PageProviderProps) => {
    const setCurrentPage = useSetAtom(currentPageAtom, {store: getDefaultStore()});
    useEffect(
        ()=>{setCurrentPage(page)}
        ,[page, setCurrentPage])
    return <>{children}</>
}