import { UserId } from "../../User/domain/IUser"

export type PostId = string
export type PostTitle = string
export type PostContent = string
export type PostImage = string
export type PostCreated = Date
export type PostUpdated = Date

export type CategoryId = string
export type CategoryNumber = number

export interface IPost {
    id: PostId,
    title: PostTitle,
    content: PostContent,
    image: PostImage
    authorId: UserId,
    created: PostCreated,
    updated: PostUpdated
}

export interface IPostCreate {
    title: PostTitle,
    content: PostContent,
    image: PostImage, 
    authorId: UserId,
}

export interface IPostUpdate {
    id: PostId,
    title?: PostTitle,
    content?: PostContent,
    image?: PostImage, 
}

export interface IPostToUI {
    id: PostId,
    title: PostTitle,
    content: PostContent,
    authorId: UserId,
    created: PostCreated,
    updated: PostUpdated
}