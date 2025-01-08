import { useEffect, useRef } from 'react';

/**
 * Custom hook to throttle the scroll wheel event on an element.
 * @param {React.RefObject<HTMLElement>} scrollTargetRef - The reference to the scrollable container.
 * @param {number} scrollHeight - The total scroll height of the container to calculate scroll distance.
 * @param {number} throttleLimit - Throttle limit in milliseconds to control the scroll behavior.
 */
const useThrottleScroll = (scrollTargetRef, isScrollBlocked, throttleLimit = 750, scrollAmount=1000, standard=true) => {
    const lastCallRef = useRef(0);

    useEffect(() => {
        if (!scrollTargetRef.current && standard) return;
        if (typeof window === 'undefined') return;

        // Define the wheel handler function
        const handleWheel = (event) => {
            // Prevent default page scroll behavio
            // event.preventDefault();
            if (isScrollBlocked.current) return;
            const now = Date.now();
            if (now - lastCallRef.current >= throttleLimit) {
                const { deltaY } = event;

                // Avoid small scrolls (less than 100px in any direction)
                if (deltaY < 85 && deltaY > -85) {
                    return;
                }

                // Throttled scroll down
                if (deltaY > 85 && deltaY < 125) {
                    // scrollTargetRef.current.scrollBy(0, scrollAmount);
                }
                // Throttled scroll up
                else if (deltaY < -85 && deltaY > -125) {
                    // scrollTargetRef.current.scrollBy(0, -scrollAmount);
                }

                lastCallRef.current = now; // Update the last scroll timestamp
            }
        };

        // Add the wheel event listener to the target element
        scrollTargetRef.current.addEventListener('wheel', handleWheel, { passive: false });

        // Cleanup the event listener on component unmount
        return () => {
            if (scrollTargetRef.current) {
                scrollTargetRef.current.removeEventListener('wheel', handleWheel);
            }
        };
    }, [scrollTargetRef, isScrollBlocked, throttleLimit, scrollAmount]); // Dependencies for re-running the effect
};

export default useThrottleScroll;