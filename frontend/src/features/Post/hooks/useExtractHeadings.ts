
export const useExtractHeadings = (html: string ) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const rawHeadings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const headings = Array.from(rawHeadings);
    const headingData = headings.map((heading, index)=>{
        const tag = heading.tagName.toLowerCase();
        const text = heading.textContent || `Untitled ${index}`;
        const id = `heading-${index}`;
        heading.id = id;
        return {id, text, tag}
    });

    return {
        headings: headingData,
        rawHeadings: rawHeadings,
        htmlWithIDs: tempDiv.innerHTML
    }
}