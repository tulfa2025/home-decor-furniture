import { useState, useEffect, useRef } from 'react';

const useInView = (elementRef, threshold = 0.5) => {
    const [isInView, setIsInView] = useState(false);

    // Delay the determination of in view, prevent loading on fast scrolls
    const timeoutRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {

                clearTimeout(timeoutRef.current)
                timeoutRef.current = setTimeout(()=>{
                    setIsInView(entry.isIntersecting)
                }, 100)
                
            },
            { threshold }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current); // Start observing the element
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current); // Clean up observer
            }
        };
    }, [elementRef, threshold]);

    return isInView;
};

export default useInView;