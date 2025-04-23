'use client'
import EditPanel from "@/features/edit-blog/EditPanel";
import { DataProvider } from "@/providers/DataProvider";
import { PageProvider } from "@/providers/PageProviders";
import { Page } from "@/providers/PageProviders/hook";

const Edit = () =>{
    return(
        <PageProvider page={Page.Edit}>
            <DataProvider>
                <EditPanel/>
            </DataProvider>
        </PageProvider>

)
}

export default Edit;
