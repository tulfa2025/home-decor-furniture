import { useState, useEffect, useRef } from 'react';
import ScrollBasedValues from '@/utils/scroll_map_values';

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState({
    width: 500,
    height: 500,
    maxHeight: 500,
    maxWidth: 500
  });

  const isFullscreen = useRef(false);
  const resizeTimeoutRef = useRef(null);

  const isFullScreenResize = useRef(false)
  const mobileDeviceRef = useRef(false);
  const mobileDeviceShifted = useRef(false)
  useEffect(() => {
    // Function to check fullscreen status
    const checkFullscreen = () => {
      clearTimeout(resizeTimeoutRef.current);
      isFullscreen.current = true;
      isFullScreenResize.current = true;

      setTimeout(()=>{
        isFullscreen.current = false
      }, 2000)
    };
    // Add fullscreen change event listener
    document.addEventListener('fullscreenchange', checkFullscreen);

  }, []); // Empty array ensures that effect is only run on mount

  useEffect(() => {
    if (typeof window !== 'undefined') {

      // SET WHETHER DEVICE IS MOBILE OR NOT
      mobileDeviceRef.current = window.innerWidth < 960;

      function handleResize() {
        // Clear the previous timeout to debounce resize events
        clearTimeout(resizeTimeoutRef.current);        
        // Set window width/height to state
        // Set a delay to ensure fullscreen state is processed first
        resizeTimeoutRef.current = setTimeout(() => {
          if(!mobileDeviceRef.current){
            // IF NOT MOBILE DEVICE
            // Only update window size if not in fullscreen mode
            if (!isFullscreen.current) {
              ScrollBasedValues.updateViewportSize({
                height: window.innerHeight,
                width: window.innerWidth
              })
              setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
                maxWidth: window.screen.width,
                maxHeight: window.screen.height
              });
              isFullScreenResize.current = false
            }
          } else {
            // IF MOBILE DEVICE
            //Compute Layout shift n first load
            if(!mobileDeviceShifted.current){
              ScrollBasedValues.updateViewportSize({
                height: window.innerHeight,
                width: window.innerWidth
              })
              setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
                maxWidth: window.screen.width,
                maxHeight: window.screen.height
              });
              mobileDeviceShifted.current = true;
              return
            }

            // Only update window size if not in fullscreen mode and if it is a part of a fullscreen process
            if (!isFullscreen.current && isFullScreenResize.current) {
              ScrollBasedValues.updateViewportSize({
                height: window.innerHeight,
                width: window.innerWidth
              })
              setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
                maxWidth: window.screen.width,
                maxHeight: window.screen.height
              });
              isFullScreenResize.current = false
            }
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