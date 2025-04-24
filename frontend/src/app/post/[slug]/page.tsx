'use server'
import Post from "@/features/post/components/Post"
import { PageProvider } from "@/providers/PageProviders"
import { Page } from "@/providers/PageProviders/hook"
import React from "react"

type PostPageProps = {
    params:{
        slug: string
    }
}

const PostPage = ({params}: PostPageProps) => {
    // need to deal with this
    const {slug} =  params
    return(
        <PageProvider page={Page.Post}>
            <Post slug={slug}/>
        </PageProvider>
    )
}

export default PostPage