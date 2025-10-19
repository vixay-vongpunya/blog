
import EditPanel from "@/features/edit-blog/EditPanel";
import { PageProvider } from "@/providers/PageProviders";
import { Page } from "@/providers/PageProviders/hook";

const Edit = async ({params}:{params: Promise<{slug: string}>}) =>{
    const {slug} = await params
    console.log(slug)
    const isDetail = slug ? slug[0] === "detail" : false;

    return(
        <PageProvider page={Page.Edit}>
            <EditPanel isDetail={isDetail}/>
        </PageProvider>
)
}

export default Edit;
