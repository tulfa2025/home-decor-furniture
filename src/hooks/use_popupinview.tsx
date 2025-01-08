import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to track if an element is in view using IntersectionObserver.
 * @param {number} threshold - The percentage of the element that needs to be visible to trigger the inView state.
 * @returns {object} - Contains the ref to attach to the element and the inView state.
 */
const usePopupInView = (threshold = 0.1, popupRef: React.RefObject<HTMLElement>) => {
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.target === popupRef.current) {
                    setIsInView(entry.isIntersecting);
                }
            },
            { threshold } // Trigger when `threshold` amount of the element is in view
        );

        if (popupRef.current) {
            observer.observe(popupRef.current); // Start observing the element
        }

        return () => {
            if (popupRef.current) {
                observer.unobserve(popupRef.current); // Cleanup observer when component unmounts
            }
        };
    }, [threshold]);

    return isInView;
};

export default usePopupInView;