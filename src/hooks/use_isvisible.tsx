import { useEffect, useRef, useState } from 'react';

const useIsVisible = (ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkOpacity = () => {
      if (ref.current) {
        const opacity = window.getComputedStyle(ref.current).opacity;
        console.log(ref.current, opacity)
        setIsVisible(parseFloat(opacity) > 0); // Set to true if opacity is greater than 0
      }
    };

    // Check opacity initially
    checkOpacity();

    // Optional: Set up a mutation observer if opacity changes dynamically
    const observer = new MutationObserver(checkOpacity);
    observer.observe(ref.current, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isVisible;
};

export default useIsVisible