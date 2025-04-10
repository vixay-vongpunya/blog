

export class PostMapper {
    static toDomain(post: any){
        return {
            title: post.title,
            content: post.content,
            authorId: post.authorId
        }
    }

    static toPersistence(post: any){
        return {
            title: post.title,
            content: post.content,
            authorId: post.authorId
        }
    }
}