import { atom, useAtom } from "jotai"

type CursorItems = {
    value: string | null;
    direction: number;
}
//direction is either 1 or -1
const cursorAtom = atom<CursorItems>({
    value: null,
    direction: 1
})

export const useCursor = () => {
    const [cursor, setCursor] = useAtom(cursorAtom)

    return{
        cursor: cursor,
        setCursor: setCursor
    }
}
