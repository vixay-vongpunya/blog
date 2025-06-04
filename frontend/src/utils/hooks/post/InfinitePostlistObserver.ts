
export const useInfinitPostlistObserver = (fetchNextPage: ()=>void) => {
    const observer = new IntersectionObserver(
        (entries)=>{
            entries.forEach(entry=>{
                if(entry.isIntersecting){
                    fetchNextPage()
                }
            })
        },{
            rootMargin: '0px 0px 50% 0px',
            threshold: 0.1
        }
    )

    return {
        observer: observer,
        cleanup: () => observer.disconnect()
    }
}