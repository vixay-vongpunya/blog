import HomePanel from "@/features/home/components/HomePanel";
import HomePanelSkeleton from "@/features/home/skeletons/HomePanel";
import { PageProvider } from "@/providers/PageProviders";
import { Page } from "@/providers/PageProviders/hook";
import { Suspense } from "react";

const Home = () => {
    return(
        <PageProvider page={Page.Home}> 
        {/* <Suspense fallback={<HomePanelSkeleton/>}> */}
            <HomePanel/>    
        {/* </Suspense>            */}
        </PageProvider>
    )
}

export default Home