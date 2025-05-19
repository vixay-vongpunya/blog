import HomePanel from "@/features/home/components/HomePanel";
import HomePanelSkeleton from "@/features/home/skeletons/HomePanel";
import { PageProvider } from "@/providers/PageProviders";
import { Page } from "@/providers/PageProviders/hook";
import { ProtectedRoutes } from "@/utils/ProtectedRoutes";
import { Suspense } from "react";

const Home = () => {
    return(
        <ProtectedRoutes>
            <PageProvider page={Page.Home}> 
            {/* <Suspense fallback={<HomePanelSkeleton/>}> */}
                <HomePanel/>    
            {/* </Suspense>            */}
            </PageProvider>
        </ProtectedRoutes>
        
    )
}

export default Home