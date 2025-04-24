import { IPostCreate, IPostToUI } from "@root/src/application/Post/domain/IPost"


export class PostMapper {
    static toDomain(post: any):IPostCreate{
        return {
            title: post.title,
            preview: post.preview,
            content: post.content,
            image: post.image,
            authorId: post.authorId,
            categoryIds: post.categoryIds
        }
    }

    static toPersistence(post: any){
        return {
            title: post.title,
            content: post.content,
            image: post.image,
            authorId: post.authorId
        }
    }

    static toUI(post: any): IPostToUI{
        return {
            id: post.id,
            title: post.title,
            content: post.content,
            authorId: post.authorId,
            created: post.created,
            updated: post.updated
        }
    }
}