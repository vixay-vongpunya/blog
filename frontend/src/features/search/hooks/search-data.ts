import { atom, useAtom } from "jotai"

const cursorAtom = atom<string | null>(null)

export const useCursor = () => {
    const [cursor, setCursor] = useAtom(cursorAtom)

    return{
        cursor: cursor,
        setCursor: setCursor
    }
}

const prevPageNumberAtom = atom<number>(0)
// if i could pass hidden query to url then no need to do this
export const usePrevPageNumber= () =>{
    const [prevPageNumber, setPrevPageNumber] = useAtom(prevPageNumberAtom)

    return {
        prevPageNumber: prevPageNumber,
        setPrevPageNumber: setPrevPageNumber,
    }
}