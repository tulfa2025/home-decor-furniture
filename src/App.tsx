"use client";
import { useCallback, useState, useEffect, useRef } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

/* CUSTOM COMPONENTS */
import SubHeader from "@/components/sub_header/SubHeader";
import useGoTo from "@/hooks/use_goto";
import SubheaderActiveContext from "@/context/subHeader";
import SubheaderStyleContext from "./context/subHeaderStyle";
import ScrollContext from "./context/scrollContext";
import layoutCollection from "@/layout/layout_collection";
import MenuPopup from "./components/menu_popup/MenuPopup";
import useWindowSize from "./hooks/use_window_size";

export default function App() {
  // Layout Collection
  const [headerStyle, setHeaderStyle] = useState(2);

  const scrollingContainersRef = useRef([]);

  const handleIsScrollBlocked = (flag = false, elementRef = null) => {
    if (elementRef) {
      if (!flag) {
        scrollingContainersRef.current.shift();
        // setCurrentScrollTarget(scrollingContainersRef.current[0])
      } else {
        scrollingContainersRef.current.unshift(elementRef.current);
        // setCurrentScrollTarget(scrollingContainersRef.current[0])
      }
    }
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  /* IDENIFIES CURRENT SLIDE IN VIEW */
  const handleChangeSlide = useCallback((slideIndex: number) => {
    setCurrentSlide(slideIndex);
  }, []);

  const handleSubheaderActive = useState(true);
  const scrollContainerRef = useRef(null);

  /* SET USUABLE SCROLL DISTANCE  */
  const [scrollDetails, setScrollDetails] = useState({
    totalScrollHeight: 0,
    scrollPositions: [],
  });

  const viewportSize = useWindowSize();

  useEffect(() => {
    const scrollPositions = [];
    for (let i = 0; i < layoutCollection.order.length; i++) {
      const component = document.getElementById(`${i}`);
      scrollPositions.push(component?.offsetTop);
    }
    setScrollDetails({
      totalScrollHeight: scrollContainerRef.current.scrollHeight,
      scrollPositions: scrollPositions,
    });
  }, [viewportSize]);

  /* DETERMINE WHICH SLIDE TO LOAD FIRST */
  useGoTo(setCurrentSlide, scrollContainerRef, scrollDetails);

  return (
    <SubheaderStyleContext.Provider value={setHeaderStyle}>
      <SubheaderActiveContext.Provider value={handleSubheaderActive}>
        <SubHeader activePage="/" headerStyleType={headerStyle} />

        <ScrollContext.Provider value={handleIsScrollBlocked}>
          <motion.div
            style={{
              position: "relative",
              top: 0,
              left: 0,
              width: "100%",
              overflowX: "hidden",
              zIndex: 20,
            }}
            className="scroll-container"
            ref={scrollContainerRef}
          >
            {/* MOST RECENT COMPONENTS RENDERED */}
            {layoutCollection.order.map((compName) => {
              const NextComp = layoutCollection[compName].component;

              const compLength = layoutCollection.order.length;

              return (
                <motion.div
                  key={compName}
                  id={compName}
                  initial={{
                    opacity: 0,
                  }} // Initial state
                  animate={{ opacity: 1 }} // Animated state
                  transition={{ duration: 1, delay: compName > 0 ? 2 : 0 }} // Duration of animation
                  style={{
                    height: "max-content",
                    minWidth: "100vw",
                    backgroundColor: "transparent",
                  }}
                >
                  <NextComp
                    layoutName={compName}
                    handleChangeSlide={handleChangeSlide}
                    zIndex={compLength - compName}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </ScrollContext.Provider>

        <MenuPopup
          layoutCollection={layoutCollection}
          scrollDetails={scrollDetails}
          scrollingContainersRef={scrollingContainersRef}
        />
      </SubheaderActiveContext.Provider>
    </SubheaderStyleContext.Provider>
  );
}
