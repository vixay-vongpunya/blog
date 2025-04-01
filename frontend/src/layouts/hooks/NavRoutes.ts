import { Page } from "@/providers/PageProviders/hook";

type navRoutesProps = {
    key: string,
    name: string,
    path: Page
}

export const navRoutes: navRoutesProps[] = [
    {
        key: "home",
        name: "Home",
        path: Page.Home,
    },
    {
        key: "contact",
        name: "Contact",
        path: Page.Contact,
    },
    {
        key: "about",
        name: "About",
        path: Page.About,
    },
    {
        key: "write",
        name: "Write",
        path: Page.Write,
    }

]