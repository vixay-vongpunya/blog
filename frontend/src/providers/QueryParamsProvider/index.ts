import { useAtom } from "jotai";
import { atomWithReducer } from "jotai/utils";

export const QueryParamItems ={
    ProfileId: 'profileId',
} as const

type QueryParamItems = (typeof QueryParamItems)[keyof typeof QueryParamItems]

export type QueryParams = {
    [key in QueryParamItems]: string
}

const initialQueryParams : QueryParams= {
    [QueryParamItems.ProfileId]: '',
}    

type QueryParamAction = {
    type: 
    | typeof QueryParamItems.ProfileId
    payload: string;
}

const queryParamsReducer = (state:  {[key in QueryParamItems]: string}, action: QueryParamAction) => {
    switch(action.type){
        case QueryParamItems.ProfileId:
            return {...state, profileId: action.payload}
    }
}

const queryParamsAtom = atomWithReducer<QueryParams, QueryParamAction>(initialQueryParams, queryParamsReducer);

export const useQueryParams = () => {
    const [queryParams, dispatchQueryParams] = useAtom(queryParamsAtom) 
    return {
        queryParams: queryParams,
        dispatchQueryParams: dispatchQueryParams
    }
}