import { useRef, useEffect } from 'react';

/**
 * Custom hook to throttle effects or logic on first render (e.g., scroll behavior).
 * @param {boolean} isInView - Dependency to trigger the effect.
 * @param {number} delay - Delay time in milliseconds for throttling.
 */
const useThrottleOnFirstRender = (isInView, delay = 70) => {
    const scrollDelayOnLoad = useRef(false);

    useEffect(() => {
        // Throttling logic: Execute the effect after the specified delay
        scrollDelayOnLoad.current = true;

        const timer = setTimeout(() => {
            scrollDelayOnLoad.current = false;
        }, delay);

        // Cleanup the timer on unmount or if dependencies change
        return () => clearTimeout(timer);
    }, [isInView, delay]);

    return scrollDelayOnLoad;
};

export default useThrottleOnFirstRender;