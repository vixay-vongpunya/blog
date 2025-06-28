import { Category } from "../category/types"
import { Comment } from "../comment/types"
import { User } from "../user/types";

// all fetched posts will be kept in pages for better organization

export type PostId = string
type PostTitle = string;
type PostPreview = string;
type PostContent = string;
type PostImage = string; // need to change this
type PostCreatedAt = string;

export type Post = {
    id: PostId;
    title: PostTitle;
    preview: PostPreview;
    content: PostContent;
    image: PostImage;
    savedPosts: {id: string} | undefined;
    author: User;
    createdAt: PostCreatedAt;
    views: number;
    categories: Category[];
    comments: Comment[];
}

// export type PostSearchTotalPages = {
//     keyword: string;
//     take: number;
//     order: 'asc' | 'desc'
// }

export type PostSearch = {
    query: string;
    page: number;
    take?: number
}