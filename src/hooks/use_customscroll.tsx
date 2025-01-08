import { useRef } from "react";

/**
 * Custom hook to monitor scroll position and check if the element is at the top or bottom.
 * @returns {function} - Contains the refs for tracking if the element is at the top or bottom and the scroll container ref.
 */
const useCustomScroll = () => {
  const currentScrollTarget = useRef<HTMLElement | null>(null);

  const startTouchPositionRef = useRef(null);
  const scrollVelocity = useRef<number>(0);

  /* ANIMATION ID */
  const currentAnimation = useRef<number | null>(null);

  /* PHYSICS CONSTANTS */
  const VEL_PER_SWIPE = 10;
  const FRICTION = 0.97;
  const VELOCITY_THRESHOLD = 0.01;
  const SCROLL_LOWER_THRESHOLD = -150;
  const SCROLL_UPPER_THRESHOLD = 150;

  const preventScrollTouch = (e) => {
    if (currentScrollTarget.current) {
      // Prevent the default scroll behavior to prevent browser scroll
      e.preventDefault();
      const target = currentScrollTarget.current; // The scrollable container
      const currentTouchY = e.touches[0].clientY; // The current touch position

      // If this is the first touch event, initialize the starting touch position
      if (startTouchPositionRef.current === null) {
        startTouchPositionRef.current = currentTouchY;
        return;
      }

      // Calculate the difference in touch position (scroll distance)
      const scrollDistance = startTouchPositionRef.current - currentTouchY;

      // Don't move if no scrolling 
      if(Math.abs(scrollDistance) < SCROLL_LOWER_THRESHOLD || Math.abs(scrollDistance) > SCROLL_UPPER_THRESHOLD) return

      // Determine the direction of scrolling (down or up)
      const scrollDirection = scrollDistance > 0 ? 1 : -1; // Positive is up, negative is down

      // Add velocity to current velocity
      scrollVelocity.current = scrollVelocity.current + (scrollDirection * VEL_PER_SWIPE * (Math.abs(scrollDistance) / 10));

      // Update the start position for the next touchmove
      startTouchPositionRef.current = currentTouchY;

      updatePosition();
    }
  };

  const updatePosition = () => {

    if (Math.abs(scrollVelocity.current) < VELOCITY_THRESHOLD) return;

    // APPLY FRICTION FORCE
    scrollVelocity.current = scrollVelocity.current * FRICTION;

    // UPDATE POSITION
    // Update the scroll position
    if (currentScrollTarget.current) {
      currentScrollTarget.current.scrollBy(0, scrollVelocity.current);
    }

    // Continue the animation frame loop
    requestAnimationFrame(updatePosition);
  };

  const setCurrentScrollTarget = (scrollTarget: HTMLElement | null) => {
    //Set current scroll target
    currentScrollTarget.current = scrollTarget;
  };

  return [preventScrollTouch, setCurrentScrollTarget];
};

export default useCustomScroll;
