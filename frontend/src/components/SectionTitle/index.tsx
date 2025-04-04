import { Typography } from "@mui/material";

type sectionTitleProps = {
    title: string
}

function SectionTitle({title}:sectionTitleProps){
    return(
        <Typography variant="h4" sx={{
            fontWeight: "bold", 
            marginBottom: 2}}>{title}</Typography>
    )
}

export default SectionTitle;