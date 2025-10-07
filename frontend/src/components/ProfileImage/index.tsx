import { Box } from "@mui/material";

const imageSize = {
    'tiny': 14,
    'small': 32,
    'medium': 48,
    'big': 64,
    'large': 88
}

type ProfileImageprops = {
    size: keyof typeof imageSize;
    path: string | null;
    alt: string | undefined;
}
function ProfileImage({size, path, alt}: ProfileImageprops){
    return(
        <Box sx={{flexShrink:0, borderRadius: '50%', height: imageSize[size], width: imageSize[size], overflow:'hidden'}}>
            <img src= {path ? path : '../person.jpg'} alt={alt} className="object-cover h-full w-full"/>
        </Box>
    )
}

export default ProfileImage;