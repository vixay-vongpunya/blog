

export interface IVectorStoreCreateData {
    id: string,
    title: string,
    preview: string,
}

export interface IVectorTotalPageSearchData {
    query: string,
    take: number,
    sessionId: string
}

export interface IVectorSearchData {
    query: string,
    page: number,
    take: number,
    userId: string,
    sessionId: string
}