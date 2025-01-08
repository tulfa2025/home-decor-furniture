import { useEffect } from 'react';
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
const useChangeSlide = (isInView, isScrollBlocked, handleChangeSlide, inViewRef, isAtTopRef, isAtBottomRef, scrollDelay=0) => {

    useEffect(() => {
        // Define the wheel event handler
        const myListener = (e) => {

            if (isScrollBlocked.current) return; // Ignore scroll if delayed;
            if (isInView) { // Check if the element is in view before handling scroll
                if (e.deltaY > 0) {
                    // Scrolled down
                    if (isAtBottomRef.current) {
                        // Check if the user is at the bottom and scroll down
                        handleChangeSlide(1, e, scrollDelay); // Move to next slide(down)
                    }
                } else {
                    // Scrolled up
                    if (isAtTopRef.current) {
                        // Check if the user is at the top and scroll up
                        handleChangeSlide(-1, e, scrollDelay); // Move to next slide (up)
                    }
                }
            }
        };

        // If the element is in view, add the event listener
        if (isInView && inViewRef.current) {
            inViewRef.current.addEventListener("wheel", myListener);
        } else if (inViewRef.current) {
            // If not in view, remove the event listener
            inViewRef.current.removeEventListener("wheel", myListener);
        }


        // Cleanup event listener on component unmount or if dependencies change
        return () => {
            if (inViewRef.current) {
                inViewRef.current.removeEventListener("wheel", myListener);
            }
        };
    }, [isInView, isScrollBlocked, handleChangeSlide, inViewRef]); // Run the effect when any of these change
    
};

export default useChangeSlide;