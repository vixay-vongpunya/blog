import { atom, getDefaultStore, useAtomValue } from 'jotai';


export const Page = {
    Home: 'home',
    Contact: 'contact',
    About: 'about',
    Write: 'write',
    Post: 'post',
    Tag: 'tag',
    SignUp: 'sign-up',
    Login: 'log-in'
} as const

export type Page = (typeof Page)[keyof typeof Page];

export const PagePath : {[key in Page]: string} = {
    [Page.Home]: '/home',
    [Page.Contact]: '/contact',
    [Page.About]: '/about',
    [Page.Write]: '/write',
    [Page.Post]: '/post',
    [Page.Tag]: '/tag',
    [Page.SignUp]: '/sign-up',
    [Page.Login]: '/log-in'
}

export const currentPageAtom = atom<Page>(Page.Home); 

export const useCurrentPage = () => {
    return {
        currentPage: useAtomValue(currentPageAtom, {store : getDefaultStore()})
    }
}
