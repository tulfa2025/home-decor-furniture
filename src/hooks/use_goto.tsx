"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Custom hook to parse search params and apply changes to page
 */
const useGoTo = (setCurrentSlide, scrollDetails) => {
  const searchParams = useSearchParams();

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
