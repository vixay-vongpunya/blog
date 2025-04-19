import { atom, getDefaultStore, useAtomValue } from 'jotai';


export const Page = {
    Home: 'home',
    Profile: 'profile',
    Contact: 'contact',
    About: 'about',
    Edit: 'edit',
    Post: 'post',
    Tag: 'tag',
    SignUp: 'sign-up',
    Login: 'log-in'
} as const

export type Page = (typeof Page)[keyof typeof Page];

export const PagePath : {[key in Page]: string} = {
    [Page.Home]: '/home',
    [Page.Contact]: '/contact',
    [Page.Profile]: '/profile',
    [Page.About]: '/about',
    [Page.Edit]: '/edit',
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
