import { Page, PagePath } from "@/providers/PageProviders/hook";

type navRoutesProps = {
    key: string,
    name: string,
    path: string,
}

export const navRoutes: navRoutesProps[] = [
    {
        key: "home",
        name: "Home",
        path: PagePath[Page.Home],
    },
    {
        key: "contact",
        name: "Contact",
        path: PagePath[Page.Contact],
    },
    {
        key: "about",
        name: "About",
        path: PagePath[Page.About],
    },
    {
        key: "write",
        name: "Write",
        path: PagePath[Page.Write],
    }

]