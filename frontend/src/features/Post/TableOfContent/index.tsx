import { Box, Card, List, ListItem, ListItemText, Table, TableBody, TableHead, TableRow, Typography } from "@mui/material";
import {  RefObject, useEffect, useMemo, useState } from "react";
import useIntersectinObserver from "../hooks/useIntersectionObserver";


export type HeadingProps = {
    id: string;
    text: string;
    tag: string;
};
  
type TableOfContentProps = {
    contentRef: RefObject<HTMLDivElement | null>;
};
  
function TabelOfContent({contentRef}: TableOfContentProps) {
    const {activeSection, toc} = useIntersectinObserver(contentRef)


    const list = useMemo(()=>(
        toc?.map(({id, text})=>(           
            <ListItem key={id} disablePadding>
                <ListItemText>
                    <a href={`#${id}`} className = {`${id === activeSection && "text-blue-200"}`}>{text}</a>
                </ListItemText>
            </ListItem>
        ))
    ),[toc, activeSection])

    return(

            <Card variant='outlined' 
                sx={{ 
                    padding: 2,
                    borderRadius: 1
                }}>
                <List dense>
                    <ListItem disablePadding>
                        <Typography variant="h6" sx={{fontWeight: "bold"}}>Table of Contents</Typography>
                    </ListItem>
                    {list} 
                </List>
            </Card>

    )
}

export default TabelOfContent;