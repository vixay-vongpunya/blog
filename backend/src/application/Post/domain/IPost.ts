
export type PostId = string
export type PostTitle = string
export type PostContent = string
export type PostCreated = Date
export type PostUpdated = Date

export interface IPost {
    id: PostId,
    title: PostTitle,
    content: PostContent,
    created: PostCreated,
    updated: PostUpdated
}

export interface IPostCreate {
    title: PostTitle,
    content: PostContent,
}

export interface IPostToUI {
    id: PostId,
    title: PostTitle,
    content: PostContent,
    created: PostCreated,
    updated: PostUpdated
}