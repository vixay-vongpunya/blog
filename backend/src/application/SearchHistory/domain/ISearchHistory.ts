import { UserId } from "../../User/domain/IUser";

export interface ISearchHistoryToUI{
    id: string,
    query: string
}

export interface ISearchHistoryCreate{
    userId:UserId,
    query: string
}