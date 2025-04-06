"use client";

import { Box, Typography } from "@mui/material";
import Header from "./Header";
import TabelOfContent from "./TableOfContent";
import { useExtractHeadings } from "./hooks/useExtractHeadings";
import BlogCard from "../../components/BlogCard";
import { blogs } from "@/data/blogs";
import SectionTitle from "@/components/SectionTitle";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const data =  `<h1 id="heading-0">The eletricity used in Industry</h1><p><br></p><p><span style="background-color: transparent; color: rgb(60, 66, 69);">Coronavirus disease (COVID-19) is an infectious disease caused by the SARS-CoV-2 virus.</span></p><p><span style="color: rgb(60, 66, 69); background-color: rgb(255, 255, 255);">Most people infected with the virus will experience mild to moderate respiratory illness and recover without requiring special treatment. However, some will become seriously ill and require medical attention. Older people and those with underlying medical conditions like cardiovascular disease, diabetes, chronic respiratory disease, or cancer are more likely to develop serious illness. Anyone can get sick with COVID-19 and become seriously ill or die at any age.</span></p><p><span style="color: rgb(60, 66, 69); background-color: rgb(255, 255, 255);">The best way to prevent and slow down transmission is to be well informed about the disease and how the virus spreads. Protect yourself and others from infection by staying at least 1 metre apart from others, wearing a properly fitted mask, and washing your hands or using an alcohol-based rub frequently. Get vaccinated when it’s your turn and follow local guidance.</span></p><p><br></p>
<h2 id="heading-1">The approach used</h2><p><br></p><p><span style="background-color: transparent; color: rgb(60, 66, 69);">Coronavirus disease (COVID-19) is an infectious disease caused by the SARS-CoV-2 virus.</span></p><p><span style="color: rgb(60, 66, 69); background-color: rgb(255, 255, 255);">Most people infected with the virus will experience mild to moderate respiratory illness and recover without requiring special treatment. However, some will become seriously ill and require medical attention. Older people and those with underlying medical conditions like cardiovascular disease, diabetes, chronic respiratory disease, or cancer are more likely to develop serious illness. Anyone can get sick with COVID-19 and become seriously ill or die at any age.</span></p><p><span style="color: rgb(60, 66, 69); background-color: rgb(255, 255, 255);">The best way to prevent and slow down transmission is to be well informed about the disease and how the virus spreads. Protect yourself and others from infection by staying at least 1 metre apart from others, wearing a properly fitted mask, and washing your hands or using an alcohol-based rub frequently. Get vaccinated when it’s your turn and follow local guidance.</span></p><p><br></p><p><span class="ql-size-large">What would the future hold</span></p><p><br></p>
<p><span style="background-color: transparent; color: rgb(60, 66, 69);">Coronavirus disease (COVID-19) is an infectious disease caused by the SARS-CoV-2 virus.</span></p><p><span style="color: rgb(60, 66, 69); background-color: rgb(255, 255, 255);">Most people infected with the virus will experience mild to moderate respiratory illness and recover without requiring special treatment. However, some will become seriously ill and require medical attention. Older people and those with underlying medical conditions like cardiovascular disease, diabetes, chronic respiratory disease, or cancer are more likely to develop serious illness. Anyone can get sick with COVID-19 and become seriously ill or die at any age.</span></p><p><span style="color: rgb(60, 66, 69); background-color: rgb(255, 255, 255);">The best way to prevent and slow down transmission is to be well informed about the disease and how the virus spreads. Protect yourself and others from infection by staying at least 1 metre apart from others, wearing a properly fitted mask, and washing your hands or using an alcohol-based rub frequently. Get vaccinated when it’s your turn and follow local guidance.</span></p><p><br></p><iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/wWwJXSRAckY?showinfo=0"></iframe><p><br></p><p>The engineers was so done with this bug</p><p><br></p>
<h1 id="heading-2">The application</h1><p><span style="background-color: transparent; color: rgb(60, 66, 69);">Coronavirus disease (COVID-19) is an infectious disease caused by the SARS-CoV-2 virus.</span></p><p><span style="color: rgb(60, 66, 69); background-color: rgb(255, 255, 255);">Most people infected with the virus will experience mild to moderate respiratory illness and recover without requiring special treatment. However, some will become seriously ill and require medical attention. Older people and those with underlying medical conditions like cardiovascular disease, diabetes, chronic respiratory disease, or cancer are more likely to develop serious illness. Anyone can get sick with COVID-19 and become seriously ill or die at any age.</span></p><p><span style="color: rgb(60, 66, 69); background-color: rgb(255, 255, 255);">The best way to prevent and slow down transmission is to be well informed about the disease and how the virus spreads. Protect yourself and others from infection by staying at least 1 metre apart from others, wearing a properly fitted mask, and washing your hands or using an alcohol-based rub frequently. Get vaccinated when it’s your turn and follow local guidance.</span></p>`
function Post(){
    const contentRef = useRef<HTMLDivElement | null>(null)
    const [activeSection, setActiveSection] = useState<string>('');
    const {headings, rawHeadings} = useExtractHeadings(data)

    // const headings = data.querySelectorAll('h1, h2, h3, h4, h5, h6')
    // const data = Array.from(headings)
    // const headingList = data.map((heading, index)=>{
    //     const text = heading.textContent || `Untitled ${index}`;
    //     const id = `heading-${index}`;
    //     heading.id = id;
    //     return {id, text}
    // });
    useEffect(()=>{
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if(entry.isIntersecting){
                            console.log("here",activeSection)
                            setActiveSection(entry.target.id);
                        }
                    })
                },
                {
                    rootMargin: "0px",
                    threshold: 0.5,
                }
            )
            
            const he = document.querySelectorAll('h1, h2, h3, h4, h5');
            he.forEach((heading=>observer.observe(heading)));
            he.forEach(a=>console.log(a))
    
            return () => {
                he.forEach((heading=>observer.unobserve(heading)))
            };
    },[headings])
    return(
        <Box sx={{
            maxWidth:"lg",
            marginX: "auto",
            paddingTop: 6, 
            gap:2,}}>

            <Box sx={{
                display: "grid",
                gridTemplateColumns: "7fr 2fr",
                gap:2,
                }}>
                <Box sx={{
                    boxShadow: 1,
                    borderRadius: 2,
                    p: 6
                }}>
                    <style>{`
                        .post-content img, iframe{
                            display: block;
                            margin: 10px auto;
                        }
                        `}</style>
                    <Header/>                
                    <Box className="post-content" dangerouslySetInnerHTML={{__html: data}} ></Box>
                </Box>
                <Box>
                    <Box sx={{
                        display: "flex", 
                        flexDirection: "column", 
                        gap:2, 
                        position: "sticky", 
                        top: 20, 
                        zIndex: 20
                        }}>
                        <Box sx={{height: "30vh", boxShadow: 2, borderRadius: 2}}>
                        </Box>
                        <TabelOfContent toc={headings} activeSection={activeSection}/>
                    </Box>

                </Box>
                
                
           </Box>
            <Box sx={{marginY:4}}>
                <SectionTitle title="Related Blogs"/>
                <Box className="grid grid-cols-3 gap-6">
                    {blogs.map(({key, title, content, author, created}, index)=>(
                        <BlogCard key={index} title={title} content={content} author={author} created={created}/>
                    ))}
                </Box>
            </Box>

        </Box>
        
    )
}

export default Post;
