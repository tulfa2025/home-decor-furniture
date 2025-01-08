import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
// Custom hook for handling wheel scroll events
const useAutoScroll = (handleChangeSlide) => {

    // Create a ref for the container element
    const containerRef = useRef(null);
    // Render next slide completely when component is fully in view
    const isInView = useInView(containerRef, { amount: 0.75 });

    useEffect(() => {
      // Define the wheel event handler
      const myListener = (e) => {
        // Event handler logic here
        if (e.deltaY > 0) {
          // Scrolled down
          handleChangeSlide(1);
          document.removeEventListener("wheel", myListener);
        } else {
          // Scrolled up
          handleChangeSlide(-1);
          document.removeEventListener("wheel", myListener);
        }
      };

      if(isInView){
        // Apply the event listener after a 2-second delay
        document.addEventListener("wheel", myListener);
      }
  
      // Cleanup function to remove the listener when the component is unmounted
      return () => {
        document.removeEventListener("wheel", myListener); // Remove the event listener
      };
    }, [isInView]); // Dependency array includes handleChangeSlide to ensure it's fresh if it changes
  
    return containerRef;
  };
  
  export default useAutoScroll;