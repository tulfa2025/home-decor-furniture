import { useState, useEffect } from 'react';

const useInView = (elementRef, threshold = 0.5) => {
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                
                if(!entry.isIntersecting){
                    setIsInView(false)
                }
                
                if(isInView !== entry.isIntersecting){
                    setIsInView(entry.isIntersecting)
                }
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