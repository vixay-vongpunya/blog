

export interface FindPostPort{
    findPostsByUserId(userId: string):Promise<any | null>
}