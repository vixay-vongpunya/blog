
import EditPanel from "@/features/edit-blog/EditPanel";
import { PageProvider } from "@/providers/PageProviders";
import { Page } from "@/providers/PageProviders/hook";

const Edit = () =>{
    return(
        <PageProvider page={Page.Edit}>
            <EditPanel/>
        </PageProvider>
)
}

export default Edit;
