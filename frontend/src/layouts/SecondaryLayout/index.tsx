'use client'
import { useMatchMedia } from '@/utils/useMatchMedia';
import { navBarHeight, useShowNavBar } from '@/utils/useShowNavBar';
import { Box, Divider } from '@mui/material';
import { ReactNode, useRef, useState } from 'react';

function SecondLayout({leftSection, rightSection}:{leftSection: ReactNode, rightSection: ReactNode}){
    const matchMedia = useMatchMedia()
    const showNavbar = useShowNavBar()
    const rightRef = useRef<HTMLDivElement>(null)
    const leftRef = useRef<HTMLDivElement>(null)
    const [isSync, setIsSync] = useState(false)
    const handleScroll = (source : 'left' | 'right') => {
        if(isSync) return;
        
        setIsSync(true)

        const from = source === 'left' ? leftRef.current : rightRef.current;
        const to = source === 'left' ? rightRef.current: leftRef.current;

        if( from && to) {
            to.scrollTop = from.scrollTop
        }

        setTimeout(()=>setIsSync(false), 10)
    }
    return(
        <Box 
            
            sx={{
            mx: 'auto',
            display: 'grid',
            gridTemplateColumns: {
                xs: '1fr',
                sm: '5fr 1px 2fr'
            },
            gap: "2em",
            
            }}> 
            <Box ref={leftRef} onScroll={()=>handleScroll('left')} marginRight= {matchMedia === "mobile" ? 0 : "2em"} paddingTop= {matchMedia === "mobile" ? "1em" : "3em"}
                sx={{
                    height: '100',
                    overflowY: 'auto'
                }}>
                {leftSection}
            </Box>
            <Box
                sx={{
                    width: '1px',
                    backgroundColor: 'divider',
                }}
            />
            {matchMedia !== "mobile" &&  
                <Box ref={rightRef}
                 onScroll={()=>handleScroll('right')}
                sx={{
                    transition: '0.3s top ease',
                    height: '100vh',
                    overflowY: 'auto',
             
                    paddingTop: "2em",
                    top: showNavbar ? '64px' : 0,
                    }} >
                    {rightSection}
                </Box>
            }
        </Box>
    )
}

export default SecondLayout;


// import { useRef, useEffect } from "react";

// export default function SecondaryLayout() {
//   const leftRef = useRef<HTMLDivElement>(null);
//   const rightRef = useRef<HTMLDivElement>(null);

//   const lastLeftScroll = useRef(0);
//   const lastRightScroll = useRef(0);
//   const isSyncingRef = useRef(false);

//   const syncScroll = (source: "left" | "right") => {
//     const from = source === "left" ? leftRef.current : rightRef.current;
//     const to = source === "left" ? rightRef.current : leftRef.current;
//     const lastScroll = source === "left" ? lastLeftScroll : lastRightScroll;

//     if (!from || !to) return;

//     const delta = from.scrollTop - lastScroll.current;
//     lastScroll.current = from.scrollTop;

//     if (isSyncingRef.current) return;
//     isSyncingRef.current = true;

//     to.scrollTop += delta;

//     requestAnimationFrame(() => {
//       isSyncingRef.current = false;
//     });
//   };

//   useEffect(() => {
//     const left = leftRef.current;
//     const right = rightRef.current;
//     if (!left || !right) return;

//     lastLeftScroll.current = left.scrollTop;
//     lastRightScroll.current = right.scrollTop;
//   }, []);

//   return (
//     <div style={{ display: "flex", height: "500px" }}>
//       <div
//         ref={leftRef}
//         onScroll={() => syncScroll("left")}
//         style={{
//           overflowY: "auto",
//           height: "100%",
//           width: "50%",
//           borderRight: "1px solid #ccc",
//           padding: "1rem",
//         }}
//       >
//         {Array.from({ length: 50 }, (_, i) => (
//           <div key={i}>Left item {i + 1}</div>
//         ))}
//       </div>
//       <div
//         ref={rightRef}
//         onScroll={() => syncScroll("right")}
//         style={{
//           overflowY: "auto",
//           height: "100%",
//           width: "50%",
//           padding: "1rem",
//         }}
//       >
//         {Array.from({ length: 30 }, (_, i) => (
//           <div key={i}>Right item {i + 1}</div>
//         ))}
//       </div>
//     </div>
//   );
// }
