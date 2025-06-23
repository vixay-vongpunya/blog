import { useEffect, useState } from "react"

export const useMatchMedia = () => {
    const [matchMedia, setMatchMedia] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })

    useEffect(()=>{
        const handleResize = () => {
            setMatchMedia({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    },[])

    if(matchMedia.width >= 1200){
        return "desktop"
    }
    else if (matchMedia.width >= 900){
        return "laptop"
    }

    else if(matchMedia.width >= 600){
        return "tablet"
    }
    else{
        return "mobile"
    }
}