import { createContext, ReactNode, useContext, useState } from "react";

export type ReplyTarget = {
    grandParentId: string | null;
    parent:{
        //commentId
        commentId: string;
        //parent user name
        displayName: string
    } | null;
    replyTo:{
        userId: string;
        displayName: string;
    } | null;    
    pageNumber: number;
}

const ReplyContext = createContext<{target: ReplyTarget, setReplyTarget: React.Dispatch<React.SetStateAction<ReplyTarget>>}>({target:{
    grandParentId: null,
    parent: null,
    replyTo : null,
    pageNumber: 0
},
    setReplyTarget: () => {}
},)

export const useReplyContext = () => useContext(ReplyContext)

function ReplyProvider({children}:{children: ReactNode}){
    const [replyTarget, setReplyTarget] = useState<ReplyTarget>({grandParentId: null, parent: null, replyTo: null, pageNumber: 0})
    console.log(replyTarget)
    return(
        <ReplyContext value={{target: replyTarget, setReplyTarget}}>
            {children}
        </ReplyContext>
    )
}


export default ReplyProvider;