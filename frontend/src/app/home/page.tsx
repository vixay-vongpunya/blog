'use client'
import HomePanel from "@/features/home/components/HomePanel";
import { PageProvider } from "@/providers/PageProviders";
import { Page } from "@/providers/PageProviders/hook";


const Home = () => {
    return(
        <PageProvider page={Page.Home}>            
            <HomePanel/>
        </PageProvider>
    )
}

export default Home