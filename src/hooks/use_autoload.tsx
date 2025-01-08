import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';

/**
 * Hook checks when component is in view, then automatically scrolls to top of component at a given threshold
 * Container component with hook also calls the rendering of the next Layout, if index is valid
 * @param {number} layoutName -- index/layoutName of next Layout in Layout array (See App component)
 * @param loadNextLayout -- Handler function at App component level to load next Layout
 * @returns {React.MutableRefObject<null>} Reference passed to component against which in view is checked
 */

const useAutoLoad = (
	layoutName: number, 
	loadNextLayout,
	viewportAmount: number
) => {
	// Create a ref for the container element
	const containerRef = useRef(null);
	// Render next slide completely when component is fully in view
	const isInView = useInView(containerRef, { amount: viewportAmount });

	// When the container is visible, call the nextLayoutLoad with the current index
	useEffect(() => {
		if (isInView) {
			//Reference to handler function in main app. Manages load of next component
			if (layoutName >= 0) {
				// Call nextLayoutLoad if layoutName is truthy
				
				if (loadNextLayout) {loadNextLayout(layoutName)};
			} else {
				// You can implement "pass" behavior here if needed
				// (e.g., simply do nothing or log something)
				console.log('No name provided, skipping...');
			}

			}
	}, [isInView]); // Call only if component is in view

	return containerRef;
};

export default useAutoLoad;
