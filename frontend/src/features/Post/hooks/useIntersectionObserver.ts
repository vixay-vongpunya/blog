import { RefObject, useEffect, useRef, useState } from "react";
import { HeadingProps } from "../TableOfContent";
import { useExtractHeadings } from "./useExtractHeadings";

function useIntersectinObserver( contentRef: RefObject<HTMLDivElement | null>){
    const [activeSection, setActiveSection] = useState<string>('')
    const [toc, setToc] = useState<HeadingProps[]>()

    useEffect(()=>{
        if (!contentRef.current) return
        const observer = new IntersectionObserver(
            // after mounting only this part is running
            (entries) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting){
                        setActiveSection(entry.target.id)
                    }   
                })
            },
            {
                rootMargin: "0px",
                threshold: 0.1,
            }
        )

        const rawHeadings = contentRef.current.querySelectorAll('h1, h2');
        // more efficient observing at useExtractheadings but i wanna seperate the job
        const headingsArray = Array.from(rawHeadings)
        const headings = useExtractHeadings({headings: headingsArray, observer})
        setToc(headings)

        // perform observing
        rawHeadings.forEach(element=>{
            observer.observe(element)
        })

        return ()=>{
            observer.disconnect()
        }
    },[])

    return {activeSection, toc}
}

export default useIntersectinObserver;