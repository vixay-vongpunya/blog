import { atom, useAtom } from "jotai"



const cursorAtom = atom<string | null>(null)


export const useCursor = () => {
    const [cursor, setCursor] = useAtom(cursorAtom)

    return{
        cursor: cursor,
        setCursor: setCursor
    }
}
