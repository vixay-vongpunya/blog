import { Category } from "../category/types"
import { Comment } from "../comment/types"
import { User } from "../user/types";

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
    author: User;
    createdAt: PostCreatedAt;
    categories: Category[];
    comments: Comment[];
}

export type PostSearch = {
    keyword: string;
    cursor: string | null;
    order: 'asc' | 'desc'
}