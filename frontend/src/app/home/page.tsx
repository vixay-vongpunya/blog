'use client'
import HomePanel from "@/features/home/components/HomePanel";
import { DataProvider } from "@/providers/DataProvider";
import { PageProvider } from "@/providers/PageProviders";
import { Page } from "@/providers/PageProviders/hook";


const Home = () => {
    return(
        <PageProvider page={Page.Home}>
            <DataProvider>
                <HomePanel/>
            </DataProvider>
        </PageProvider>
    )
}

export default Home