import { useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';

/**
 * Custom hook to handle change page event on scroll.
 * @param {boolean} isInView - Dependency to check if the element is in view.
 * @param {boolean} isScrollDelayed - If the scroll should be delayed.
 * @param {Function} handleChangeSlide - Function to handle slide change on scroll.
 * @param {React.RefObject} inViewRef - Reference to the DOM element being observed.
 * @param {React.RefObject} isAtTopRef - Reference to track if element is at the top.
 * @param {React.RefObject} isAtBottomRef - Reference to track if element is at the bottom.
 */
const useSwipe = (isInView, isScrollBlocked, handleChangeSlide, inViewRef, scrollHeight) => {

    // Create a ref to store the current inViewRef (since refs are mutable and don't trigger rerenders)
    const inViewRefCurrent = useRef(inViewRef.current);
    const isAtTopRefCurrent = useRef(null);
    const isAtBottomRefCurrent = useRef(null);

    // Keep the ref updated
    useEffect(() => {
        inViewRefCurrent.current = inViewRef.current;
    }, [inViewRef]); // Update whenever inViewRef changes


    // Function that handles swipe logic
    const handleChangeSlideSwipe = (eventData) => {
        if (isScrollBlocked.current) return; // Ignore scroll if delayed;

        // If scroll container is available, check the scroll position
        if (inViewRefCurrent.current) {

            
            const scrollY = inViewRefCurrent.current.scrollTop;
            const containerHeight = inViewRefCurrent.current.clientHeight;

            // Check if we're at the top or bottom
            isAtTopRefCurrent.current = scrollY === 0;
            isAtBottomRefCurrent.current = scrollY + containerHeight >= scrollHeight - 10;
        }

        // Access the updated ref
        if (isInView && inViewRefCurrent.current) {
            if (eventData.deltaY < 0) {
                // Scrolled down
                if (isAtBottomRefCurrent.current) {
                    // Check if the user is at the bottom and scroll down
                    handleChangeSlide(1, eventData); // Move to next slide(down)
                }
            } else {
                // Scrolled up
                if (isAtTopRefCurrent.current) {
                    // Check if the user is at the top and scroll up
                    handleChangeSlide(-1, eventData); // Move to next slide (up)
                }
            }
        }
    };

    const swipeHandlers = useSwipeable({
        onSwiped: handleChangeSlideSwipe, // This will trigger after the swipe gesture is detected
        trackMouse: true, // Enable mouse tracking for desktop users
        preventScrollOnSwipe: true
    });

    return swipeHandlers
};

export default useSwipe;