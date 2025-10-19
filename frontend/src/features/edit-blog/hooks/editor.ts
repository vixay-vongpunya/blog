import { atom, useAtom } from "jotai"

const editorAtom = atom({
    editor:null
})
export const useEditor = () => {
    const [editor, setEditor] = useAtom(editorAtom)

    return{
        editor,
        setEditor
    }
}