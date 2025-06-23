import { useEffect, useState } from "react";

export const useShowNavBar = () => {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlNavbar = () => {
        if (window.scrollY > lastScrollY) {
        setShow(false); 
        } else {
        setShow(true);
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => window.removeEventListener("scroll", controlNavbar);
    }, [lastScrollY]);

    return show


}