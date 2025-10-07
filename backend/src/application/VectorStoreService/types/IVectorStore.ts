

export interface IVectorStoreCreateData {
    id: string,
    title: string,
    preview: string,
}

export interface IVectorTotalPageSearchData {
    query: string,
    take: number,
    userId: string | undefined,
    sessionId: string,
}

export interface IVectorSearchData {
    query: string,
    page: number,
    take: number,
    userId: string | undefined,
    sessionId: string
}

export interface IVectorFeedData {
    page: number,
    take: number,
    userId: string | undefined,
    sessionId: string
}

export interface IVectorStoreUserVectorUpdateData {
    userId: string,
    postIds: string[]
}