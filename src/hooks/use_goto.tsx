"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useWindowSize from "@/hooks/use_window_size";

/**
 * Custom hook to parse search params and apply changes to page
 */
const useGoTo = (setCurrentSlide, scrollContainerRef, scrollDetails) => {
  const searchParams = useSearchParams();
  const viewportSize = useWindowSize()

  useEffect(() => {
    if (searchParams) {
      const component = searchParams.get("comp");
      const num = Number(component);

      if (component) {
        setCurrentSlide(num);

        const scrollDistance = scrollDetails.scrollPositions[num];

        window.scrollTo({
          top: scrollDistance,
          behavior: "smooth",
        });
      } else {
        return;
      }
    }
  }, [scrollDetails]);
};

export default useGoTo;
