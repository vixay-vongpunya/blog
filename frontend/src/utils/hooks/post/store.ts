import { atom, useAtom } from "jotai"

type SelectedPost = {
    queryKey: readonly unknown[] | undefined,
    pageNumber: number | undefined,
}

const selectedPostAtom = atom<SelectedPost>({queryKey: undefined, pageNumber: undefined})
export const usePostStore = () => {
    //to allow consistent of post across the list
    const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)

    return {
        selectedPost: selectedPost,
        setSelectedPost: setSelectedPost
    }
}