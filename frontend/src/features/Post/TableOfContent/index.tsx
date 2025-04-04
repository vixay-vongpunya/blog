import { Box, List, ListItem, ListItemText, Table, TableBody, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

type HeadingProps = {
    id: string;
    text: string;
    tag: string;
  };
  
  type TableOfContentProps = {
    toc: HeadingProps[];
    activeSection: string;
  };
  
  function TabelOfContent({ toc, activeSection }: TableOfContentProps) {
        const list = useMemo(()=>(
        toc.map(({id, text})=>(           
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