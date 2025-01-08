"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Custom hook to parse search params and apply changes to page
 */
const useGoTo = (setCurrentSlide, scrollContainerRef, scrollDetails) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      const component = searchParams.get("comp");
      const num = Number(component);

      if (component) {
        setTimeout(() => {
          setCurrentSlide(num);

          const scrollDistance =
            scrollDetails.scrollPositions[num];

          window.scrollTo({
            top: scrollDistance,
            behavior: "smooth",
          });
        }, 200);
      } else {
        return;
      }
    }
  }, [scrollDetails]);
};

export default useGoTo;
