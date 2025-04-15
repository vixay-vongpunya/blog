import { Box, List, ListItem, ListItemText, Table, TableBody, TableHead, TableRow, Typography } from "@mui/material";
import {  RefObject, useEffect, useMemo, useState } from "react";
import useIntersectinObserver from "../hooks/useIntersectionObserver";

export type HeadingProps = {
    id: string;
    text: string;
    tag: string;
};
  
type TableOfContentProps = {
    toc: HeadingProps[] | undefined;
    contentRef: RefObject<HTMLDivElement | null>;
    html: string

};
  
function TabelOfContent({toc, contentRef, html}: TableOfContentProps) {
    const {activeSection} = useIntersectinObserver(contentRef, html)

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
        <Box>
            <Box sx={{ 
                padding: 2,
                boxShadow:1,
                borderRadius: 2
            }}>
                <List dense>
                    <ListItem disablePadding>
                        <Typography variant="h6" sx={{fontWeight: "bold"}}>Table of Contents</Typography>
                    </ListItem>
                    {list} 
                </List>
                
            </Box>
        </Box>
    )
}

export default TabelOfContent;