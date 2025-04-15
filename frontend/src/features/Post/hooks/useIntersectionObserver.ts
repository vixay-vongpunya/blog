import { RefObject, useEffect, useRef, useState } from "react";

function useIntersectinObserver( contentRef: RefObject<HTMLDivElement | null>, html: string ){
    const [activeSection, setActiveSection] = useState('')
    const [headings, setHeadings] = useState()
    const observerRef = useRef<IntersectionObserver>(null)
    
    useEffect(()=>{
        if (!contentRef.current) return
        console.log(contentRef.current)
        observerRef.current = new IntersectionObserver(
            (entries) => {
                console.log("entry", entries)
                entries.forEach(entry => {
                    if(entry.isIntersecting){
                        setActiveSection(entry.target.id)
                    }   
                })
            },
            {
                rootMargin: "0px 0px -50% 0px",
                threshold: 0.1,
            }
        )

        const elements = contentRef.current.querySelectorAll('h1, h2');
        console.log("ele",elements)
        elements.forEach(((heading:any)=>observerRef.current?.observe(heading)));
        elements.forEach((a:any)=>console.log("there",a))
        
        return ()=>{
            observerRef.current?.disconnect()
        }
    },[html])

    return {activeSection}
}

export default useIntersectinObserver;