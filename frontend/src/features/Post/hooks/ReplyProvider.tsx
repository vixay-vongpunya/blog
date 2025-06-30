import { createContext, ReactNode, useContext, useState } from "react";

export type ReplyTarget = {
    parentId: string,
    userId: string,
    displayName: string
} | undefined

const ReplyContext = createContext<{replyTarget: ReplyTarget, setReplyTarget: (target: ReplyTarget) => void}>({
    replyTarget: undefined,
    setReplyTarget: () => {}
})

export const useReplyContext = () => useContext(ReplyContext)

function ReplyProvider({children}:{children: ReactNode}){
    const [replyTarget, setReplyTarget] = useState<ReplyTarget>(undefined)
    return(
        <ReplyContext value={{replyTarget, setReplyTarget}}>
            {children}
        </ReplyContext>
    )
}


export default ReplyProvider;