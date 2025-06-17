
export const postsProcessing = (posts: any) => {
    return posts.map((post:any)=>{
            return ({
            ...post,
            imagePath: post.imagePath ? `${process.env.POST_IMAGE_STORAGE}/${post.imagePath}` : null,
            categories: post.postCategories?.map(({category}:any)=>category),
            savedPost: post.savedPosts.length>0 ? {id: post.savedPosts[0].id} : null,
            author: {
                ...post.author,
                profileImage: post.author.profileImage ? `${process.env.USER_IMAGE_STORAGE}/${post.author.profileImage}` : null,
            }
            })
        })
}