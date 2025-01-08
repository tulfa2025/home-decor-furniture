import { useEffect, useRef } from 'react';

/**
 * Custom hook to monitor scroll position and check if the element is at the top or bottom.
 * @param {number} scrollHeight - The total scroll height of the scrollable container.
 * @returns {object} - Contains the refs for tracking if the element is at the top or bottom and the scroll container ref.
 */
const useScrollPosition = (scrollHeight: number, scrollTarget: React.RefObject<HTMLElement | null>) => {
    const isAtTopRef = useRef(true);  // Ref for tracking if it's at the top
    const isAtBottomRef = useRef(false); // Ref for tracking if it's at the bottom

    useEffect(() => {
        const handleScroll = () => {
            const scrollContainer = scrollTarget.current;

            // If scroll container is available, check the scroll position
            if (scrollContainer) {
                const scrollY = scrollContainer.scrollTop;
                const containerHeight = scrollContainer.clientHeight;

                // Check if we're at the top or bottom
                isAtTopRef.current = scrollY === 0;
                isAtBottomRef.current = scrollY + containerHeight >= scrollHeight - 1;
            }
        };

        // Attach scroll event listener to track the scroll position
        const scrollContainer = scrollTarget.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('wheel', handleScroll, { passive: true });
        }

        // Cleanup event listener on unmount
        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('wheel', handleScroll);
            }
        };
    }, [scrollHeight]); // Re-run effect when `scrollHeight` changes

    return { isAtTopRef, isAtBottomRef };
};

export default useScrollPosition;