type ExtractHeadingsProps = {
    headings: Element[],
    observer: IntersectionObserver,
}

export function useExtractHeadings({headings, observer}: ExtractHeadingsProps){
    
    const toc = headings.map(((heading:any, index)=>{ 
        const tag = heading.tagName.toLowerCase()
        const id = `heading-${index}`;
        const text = heading.textContent || `Untitled ${index}`
        heading.id = id
        observer.observe(heading)
        return {
            id: id,
            text: text,
            tag: tag
            }
        }
    ));

    return toc

}