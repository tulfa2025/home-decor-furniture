import { useState, useEffect, useRef } from 'react';

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 500,
    height: 500,
    maxHeight: 500,
    maxWidth: 500
  });

  const isFullscreen = useRef(false);
  const resizeTimeoutRef = useRef(null);


  useEffect(() => {

    // Function to check fullscreen status
    const checkFullscreen = () => {
      clearTimeout(resizeTimeoutRef.current);
      isFullscreen.current = true;

      setTimeout(()=>{
        isFullscreen.current = false
      }, 2000)
    };
    // Add fullscreen change event listener
    document.addEventListener('fullscreenchange', checkFullscreen);

  }, []); // Empty array ensures that effect is only run on mount

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize() {
        // Clear the previous timeout to debounce resize events
        clearTimeout(resizeTimeoutRef.current);        
        // Set window width/height to state
        // Set a delay to ensure fullscreen state is processed first
        resizeTimeoutRef.current = setTimeout(() => {
          // Only update window size if not in fullscreen mode
          if (!isFullscreen.current) {
            setWindowSize({
              width: window.innerWidth,
              height: window.innerHeight,
              maxWidth: window.screen.width,
              maxHeight: window.screen.height
            });
          }
        }, 1000); // Adjust delay as needed
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [])


  return windowSize;
}

export default useWindowSize;