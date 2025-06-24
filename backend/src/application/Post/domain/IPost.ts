import { UserId } from "../../User/domain/IUser"

export type PostId = string
export type PostTitle = string
export type PostPreview = string
export type PostContent = string
export type PostImage = string
export type PostCreated = Date
export type PostUpdated = Date

export type CategoryId = string
export type CategoryNumber = number


export interface IPost {
    id: PostId,
    title: PostTitle,
    preview: PostPreview,
    content: PostContent,
    image: PostImage
    authorId: UserId,
    created: PostCreated,
    updated: PostUpdated
}

export interface IPostCreate {
    title: PostTitle,
    preview: PostPreview,
    content: PostContent,
    image: PostImage, 
    authorId: UserId,
    categoryIds: CategoryId[],
}

export interface IPostUpdate {
    id: PostId,
    title?: PostTitle,
    content?: PostContent,
    image?: PostImage, 
}

export interface IPostSearch {
    userId: string
    query: string,
    take:number,
    cursor?: string,
    page?: number,
    order: 'asc' | 'desc'
}

export interface IPostsByAuthorsToDomain {
    userId: string
    sessionId: string
    cursor: string | undefined,
}

export interface IPostsByAuthors {
    userId: string
    authorIds: string[]
    cursor: string | undefined,
}

export interface IPostToUI {
    id: PostId,
    title: PostTitle,
    content: PostContent,
    preview: PostPreview,
    image: PostImage,
    authorId: UserId,
    created: PostCreated,
    updated: PostUpdated
}