import { atom, useAtom } from "jotai"

type CursorItems = {
    value: string | undefined;
    next: boolean;
}
//next is either 1 or -1
const cursorAtom = atom<CursorItems>({
    value: undefined,
    next: true
})

export const useCursor = () => {
    const [cursor, setCursor] = useAtom(cursorAtom)

    return{
        cursor: cursor,
        setCursor: setCursor
    }
}
